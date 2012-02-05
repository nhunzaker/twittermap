// The Tweet Document
// -------------------------------------------------- //

Tweet = App.Model("tweet", {

    validate_doc_update: function (newDoc, oldDoc, usrCtx) {

        var type = (oldDoc || newDoc)['type'];
        
        function validate(beTrue, message) {
            if (!beTrue) throw ({ error : message });
        }

        validate(newDoc.type === "tweet", "Tweet type is not 'tweet'");
        
    },
    
    views: {

        all: {
            map: function(doc) { 
                if (doc.type === 'tweet') { 
                    emit(null, doc);
                }
            }
        },
        
        geolocation: {
            map: function(doc) { 
                if (doc.geo && doc.type === 'tweet') { 
                    emit(null, doc);
                }
            }
        }

    }

});