var Async = require('async')
var _ = require('lodash')

module.exports = function(Dynamo, Params, Callback) {
    Dynamo.describeTable({
        TableName: Params.TableName
    }, function(err, data) {
        //Get numbers of Segements for this table, in Mega Bytes
        var nbSegments = Math.round(data.Table.TableSizeBytes/1000000);

        //Just to obtain an array of segments
        var segments = []
        for(var i = 0; nbSegments > i; i++) { segments.push(i) }

        //Map segments keys 
        Async.map(segments, function(el, end) {

            Params.TotalSegments = nbSegments
            Params.Segment = el

            //Run scan for this segment
            Dynamo.scan(Params, function(err, res) {
                if(err) { end(err); return; }
                end(null, res.Items)
            })

        }, function(err, res) {

            if(err) { Callback(err); return; }

            //TODO : Ensure check if last scan are executed

            var merged = [].concat.apply([], res);
            var filtered = _.uniq(merged)

            Callback(err, filtered)

        })

    })

}