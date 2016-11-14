/**
 * Created by https://github.com/maynagashev
 */

(function () {

    var app = angular.module('wikiSearch', []).run(function(){ console.log("Angular loaded."); });

    angular.module('wikiSearch').controller('MainController', ['wiki', '$scope', function (wiki, $scope){

        $scope.errm = [];
        $scope.resultsFetched = false;
        $scope.query = '';
        $scope.results = [];


        this.sendRequest = function () {
            if ($scope.query) {
                wiki.fetch($scope.query).then(function success(d) { showResults(d.data.query.search); });
            }
            else {
                $scope.errm.push('Empty query.');
            }
        }


        function showResults(results) {

            $scope.pagination = pagination(results, 3, 1);

            $scope.errm = [];
            var len = results.length;
            if (len > 0) {
                $scope.errm.push("Returned: " + len + " results.");
            }
            else {
                $scope.errm.push("Nothing found.");
            }
        }


        function pagination(items, perPage, curPage) {

            var pagesCount = Math.floor((items.length%perPage===0) ? items.length/perPage : items.length/perPage+1);
            curPage = (Number.isInteger(curPage) && curPage>=1 && curPage<=pagesCount) ? curPage : 1;

            var r = {
                curPage : curPage,
                start : curPage*perPage-perPage,
                finish : curPage*perPage-1,
                length : items.length,
                perPage : perPage,
                pagesCount : pagesCount,
                items : items,
                list : [],
                pages : []
            };

            r.list = r.items.slice(r.start,r.finish+1);
            for(var i=0; i<pagesCount; i++) { r.pages[i] = i+1; }

            console.log(r);
            return r;
        }

        this.showPage = function (page) {
            $scope.pagination = pagination($scope.pagination.items, 3, page);
        };

    }]);
})();



