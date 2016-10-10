/**
 * Created by Vineeth on 10/10/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);
    function WebsiteService(){
        var website = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];
        var api = {
            "createWebsite" : "createWebsite",
            "findWebsitesByUser" : "findWebsitesByUser",
            "findWebsiteById":"findWebsiteById",
            "updateWebsite":"updateWebsite",
            "deleteWebsite":"deleteWebsite"
        }
        return api;
        function createWebsite(userId,site){
            site.developedId = userId;
            website.push(site);
        }
        function findWebsitesByUser(userId){
            for(var i=0;i<website.length;i++){
                if(website[i]._id == userId)
                    return website[i];
            }
            return false;
        }
        function findWebsiteById(websiteId){
            for(var i=0;i<website.length;i++){
                if(website[i]._id == websiteId)
                    return website[i];
            }
            return false;
        }
        function updateWebsite(websiteId,website) {
            var w = findWebsiteById(websiteId);
            if(w) {
                w = website;
            }
            return false;
        }
        function deleteWebsite(websiteId) {
            for(var i=0;i<website.length;i++){
                if(website[i]._id == websiteId)
                    website.splice(i,1);
            }
        }
    }
})();