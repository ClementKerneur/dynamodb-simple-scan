var Async = require('async')

module.exports = function(Dynamo, Params, Callback) {
    Dynamo.describeTable({
        TableName: Params.TableName
    }, function(err, data) {
        var nbSegments = Math.round(data.Table.TableSizeBytes/1000000);
        // console.log(nbSegments);

        //Just to obtain an array of segments
        var segments = []
        for(var i = 0; nbSegments > i; i++) { segments.push(i) }

        // console.log(segments)

        // process.exit();

        Async.map(segments, function(el, end) {

            Params.TotalSegments = nbSegments
            Params.Segment = el

            Dynamo.scan(Params, (err, res) => {

                end(null, res.Items);
            })
        }, function(err, res) {

            var merged = [].concat.apply([], res);

            Callback(err, merged)

        })

    })

}



