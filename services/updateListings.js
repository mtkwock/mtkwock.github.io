var https = require('https');
var fs = require('fs');
var config = require('../config');

var outFile = './listings.json';
var listingData = [];

var writeFile = function(data){
    fs.writeFile(outFile, JSON.stringify(data, null, 4), function(err){
        if(err){
            console.log(err);
        }
        else {
            console.log("Listing Data saved to " + outFile);
        }
    })
}

var updateListings = function(){
    var link = "https://openapi.etsy.com/v2/shops/7349095/listings/active?api_key=7fb6eskbrjyq3vhpamna21i8&shop_name=QuickSilverVisions"
    var magicallyCapriciousUserId = "25373646"
    var quickSilverVisionsShopId = "7349095"
    var etsyUrl = "openapi.etsy.com";
    var listingsExt = "/v2/shops/" + quickSilverVisionsShopId + "/listings/active"
    var params = {
        api_key: config.etsy.keystring,
        limit: 9001
    };

    var getPath = function(ext, params){
        var str = ext + "?";
        for(prop in params){
            str = str + prop + "=" + encodeURIComponent(params[prop]) + "&";
        }
        return str.substring(0, str.length-1);
    };

    var options = {
      host: etsyUrl,
      path: getPath(listingsExt, params),
      method: 'GET'
    };

    https.get(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        if(res.statusCode !== 200){
            console.error("Failure to get Listing Data");
            return;
        }
        var str = "";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            str += chunk;
        });

        res.on('end', function(){
            var data = JSON.parse(str);
            listingData = data.results.map(function(item){
                return {
                    id: item.listing_id || -1,
                    name: item.title || "",
                    description: item.description || "",
                    price: item.price || "??.??",
                    unit: item.currency_code || "?",
                    url: item.url || "",
                    tags: item.tags || [],
                    stock: item.quantity || 0,
                    pictureLinks: []
                };
            });

            pictureLinkLoop(parseInt(data.count));

        });
    }).end();
};

var pictureLinkLoop = function(remain){
    var active = listingData[remain-1];
    var pictureLinkOptions = {
        host: "openapi.etsy.com",
        path: "/v2/listings/" + active.id + "/images?api_key=" + config.etsy.keystring,
    };

    https.get(pictureLinkOptions, function(res){
        if(res.statusCode === 200){
            var linkStr = "";
            res.on('data', function(chunk){
                linkStr += chunk;
            });
            res.on('end', function(){
                var linkData = JSON.parse(linkStr);
                active.pictureLinks = linkData.results.map(function(row){
                    // Gets 170x135 pixel link
                    return row.url_170x135;
                });

                if(remain === 1){
                    console.log("Finished");
                    writeFile(listingData);
                }
            });
        }
        else {
            console.error("Link errored out")
        }
    });

    if(remain > 1){
        console.log("Remaining: " + remain);
        setTimeout(function(){
            pictureLinkLoop(remain - 1);
        }, 210);
    }
}

updateListings();
