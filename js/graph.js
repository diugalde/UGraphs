<html>
  <head>
    <title>dependo</title>
    <style>
        body {
    background: #fff;
    padding:0;
    margin:0;
    font-family:helvetica,arial;
    overflow: hidden;
  }

  .graph {
    width:100%;
    height: 100%;
    fill: #000;
    overflow: hidden;
    position: relative;
  }

  svg {
    height: 100%;
    width: 100%;
  }

  g.dimmed  {
    stroke-opacity: 0.05;
  }

  g.dimmed text.shadow {
    stroke-opacity: 0;
  }

  circle {
    fill: #ccc;
    stroke: #333;
    stroke-width: 1.5px;
  }

  text {
    font: 10px sans-serif;
    pointer-events: none;
  }

  text.shadow {
    stroke: #fff;
    stroke-width: 3px;
    stroke-opacity: .8;
  }

  path.link {
    fill: none;
    stroke: #666;
    stroke-width: 1.5px;
  }

  path.link.licensing {
    stroke: green;
  }

  path.link.resolved {
    stroke-dasharray: 0,2 1;
  }


  .control-zoom {
    position: fixed;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.25);
    padding: 5px;
    border-radius: 7px;
    z-index: 100;
  }

  .control-zoom a {
    background: rgba(255, 255, 255, 0.75);
    background-position: 50% 50%;
    background-repeat: no-repeat;
    display: block;
    width: 19px;
    height: 19px;
    border-radius: 4px;
  }

  .control-zoom a:last-child {
    margin: 0;
  }

  .control-zoom a:hover {
    background-color: white;
  }

  .control-zoom > .control-zoom-in {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAQMAAADaX5RTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUwRTZCRkI3NjQzNzExRTBBQUI3RTAwMUU2MTZDRkQ5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUwRTZCRkI4NjQzNzExRTBBQUI3RTAwMUU2MTZDRkQ5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTBFNkJGQjU2NDM3MTFFMEFBQjdFMDAxRTYxNkNGRDkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTBFNkJGQjY2NDM3MTFFMEFBQjdFMDAxRTYxNkNGRDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7cwPMXAAAABlBMVEUAAAD///+l2Z/dAAAAAnRSTlP/AOW3MEoAAAARSURBVAhbY3jcwABBcAATAQBxlwhT4XiahwAAAABJRU5ErkJggg==);
    margin-bottom: 5px;
  }

  .control-zoom > .control-zoom-out {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAQMAAADaX5RTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU5MjRDMEQ5NjQzNzExRTBCM0JDQkU2MzVGQTBCNjRDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU5MjRDMERBNjQzNzExRTBCM0JDQkU2MzVGQTBCNjRDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTkyNEMwRDc2NDM3MTFFMEIzQkNCRTYzNUZBMEI2NEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTkyNEMwRDg2NDM3MTFFMEIzQkNCRTYzNUZBMEI2NEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7uh53jAAAABlBMVEUAAAD///+l2Z/dAAAAAnRSTlP/AOW3MEoAAAARSURBVAhbY/jfwABBcAATAQB6xwj7vHGbwAAAAABJRU5ErkJggg==);
    margin-bottom: 5px;
  }

    </style>
  </head>

  <body>
    <div class="graph">
      <div class="control-zoom">
          <a class="control-zoom-in" href="#" title="Zoom in"></a>
          <a class="control-zoom-out" href="#" title="Zoom out"></a>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.0.1/d3.v3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.3/underscore-min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>

    <script>
      var getGraphData = function() { return {"directed":true,"multigraph":false,"graph":[],"nodes":[{"id":"jquery"},{"id":"js/app/controller/Base"},{"id":"js/app/controller/c1"},{"id":"js/app/controller/c2"},{"id":"js/app/lib"},{"id":"js/app/main1"},{"id":"js/app/model/m1"},{"id":"js/app/main2"},{"id":"js/app/model/m2"},{"id":"js/app/model/Base"},{"id":"js/common"},{"id":"js/lib/require"},{"id":"js/page1"},{"id":"app/main1"},{"id":"js/page2"},{"id":"app/main2"}],"links":[{"source":2,"target":1},{"source":3,"target":1},{"source":4,"target":0},{"source":5,"target":0},{"source":5,"target":2},{"source":5,"target":4},{"source":5,"target":6},{"source":7,"target":0},{"source":7,"target":3},{"source":7,"target":4},{"source":7,"target":8},{"source":6,"target":9},{"source":8,"target":9},{"source":12,"target":13},{"source":12,"target":10},{"source":14,"target":15},{"source":14,"target":10}]};};
      console.log(getGraphData());

      (function() {

  var url = 'data.json'
  var r = 10;
  var graph, layout, zoom, nodes, links, data;
  var linkedByIndex = {};
  var graphWidth, graphHeight;

  // Helpers
  function formatClassName(prefix, object) {
    return prefix + '-' + object.id.replace(/(\.|\/)/gi, '-');
  }

  function findElementByNode(prefix, node) {
    var selector = '.'+formatClassName(prefix, node);
    return graph.select(selector);
  }

  function isConnected(a, b) {
    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
  }

  function fadeRelatedNodes(d, opacity, nodes, links) {

    // Clean
    $('path.link').removeAttr('data-show');

    nodes.style("stroke-opacity", function(o) {

      if (isConnected(d, o)) {
        thisOpacity = 1;
      } else {
        thisOpacity = opacity;
      }

      this.setAttribute('fill-opacity', thisOpacity);
      this.setAttribute('stroke-opacity', thisOpacity);

      if(thisOpacity == 1) {
        this.classList.remove('dimmed');
      } else {
        this.classList.add('dimmed');
      }

      return thisOpacity;
    });

    links.style("stroke-opacity", function(o) {

      if (o.source === d) {

        // Highlight target/sources of the link
        var elmNodes = graph.selectAll('.'+formatClassName('node', o.target));
        elmNodes.attr('fill-opacity', 1);
        elmNodes.attr('stroke-opacity', 1);

        elmNodes.classed('dimmed', false);

        // Highlight arrows
        var elmCurrentLink = $('path.link[data-source=' + o.source.index + ']');
        elmCurrentLink.attr('data-show', true);
        elmCurrentLink.attr('marker-end', 'url(#regular)');

        return 1;

      } else {

        var elmAllLinks = $('path.link:not([data-show])');

        if(opacity == 1) {
          elmAllLinks.attr('marker-end', 'url(#regular)');
        } else {
          elmAllLinks.attr('marker-end', '');
        }

        return opacity;
      }

    });
  }


  function render() {

    zoom = d3.behavior.zoom();
    zoom.on("zoom", onZoomChanged);

    // Setup layout
    layout = d3.layout.force()
      .gravity(.05)
      .charge(-300)
      .linkDistance(100);

    // Setup graph
    graph = d3.select(".graph")
      .append("svg:svg")
      .attr("pointer-events", "all")
      .call(zoom)
      .append('svg:g')
        .attr('width', graphWidth)
        .attr('height', graphHeight);

    d3.select(window).on("resize", resize);

    // Load graph data
    var graphData = window.getGraphData();
    renderGraph(graphData);

    data = graphData;

    // Resize
    resize();

    centerGraph();

    // Controlers
    $('.control-zoom a').on('click', onControlZoomClicked);
  }

  function resize() {
    graphWidth = window.innerWidth,
    graphHeight = window.innerHeight;
    graph.attr("width", graphWidth)
         .attr("height", graphHeight);

    layout.size([graphWidth, graphHeight])
          .resume();
  }

  function centerGraph() {

    var centerTranslate = [
      (graphWidth / 2) - (graphWidth * 0.2 / 2),
      (graphHeight / 2) - (graphHeight * 0.2 / 2),
    ];

    zoom.translate(centerTranslate);

    // Render transition
    graph.transition()
      .duration(500)
      .attr("transform", "translate(" + zoom.translate() + ")" + " scale(" + zoom.scale() + ")");
  }

  function renderGraph(data) {


    // Markers
    graph.append("svg:defs").selectAll("marker")
        .data(['regular'])
      .enter().append("svg:marker")
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
      .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    // Lines
    links = graph.append('svg:g').selectAll("line")
      .data(data.links)
      .enter().append("svg:path")
      .attr('class', 'link')
      .attr("data-target", function(o) { return o.target })
      .attr("data-source", function(o) { return o.source })
      .attr("marker-end", function(d) { return "url(#regular)"; });

    // Nodes
    nodes = graph.append('svg:g').selectAll("node")
      .data(data.nodes)
      .enter().append("svg:g")
      .attr("class","node")
      .call(layout.drag)
      .on("mousedown", onNodeMouseDown);

      // Circles
      nodes.attr("class", function(d) { return formatClassName('node', d) })
      nodes.append("svg:circle")
        .attr("class", function(d) { return formatClassName('circle', d) })
        .attr("r", 6)
        .on("mouseover", _.bind(onNodeMouseOver, this, nodes, links))
        .on("mouseout", _.bind(onNodeMouseOut, this, nodes, links) );


      // A copy of the text with a thick white stroke for legibility.
      nodes.append("svg:text")
          .attr("x", 15)
          .attr("y", ".31em")
          .attr("class", function(d) { return 'shadow ' + formatClassName('text', d) })
          .text(function(d) { return d.id; });

      nodes.append("svg:text")
          .attr("class", function(d) { return formatClassName('text', d) })
          .attr("x", 15)
          .attr("y", ".31em")
          .text(function(d) { return d.id; });

    // Build linked index
    data.links.forEach(function(d) {
      linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

    // Draw the
    layout.nodes(data.nodes);
    layout.links(data.links);
    layout.on("tick", onTick);
    layout.start();

    zoom.scale(0.4);

    // Render transition
    graph.transition()
      .duration(500)
      .attr("transform", "scale(" + zoom.scale() + ")");

  }

  function onNodeMouseOver(nodes, links, d) {

    // Highlight circle
    var elm = findElementByNode('circle', d);
    elm.style("fill", '#b94431');

    // Highlight related nodes
    fadeRelatedNodes(d, .05, nodes, links);
  }

  function onNodeMouseOut(nodes, links, d) {

    // Highlight circle
    var elm = findElementByNode('circle', d);
    elm.style("fill", '#ccc');

    // Highlight related nodes
    fadeRelatedNodes(d, 1, nodes, links);
  }

  function onTick(e) {

    links.attr("d", function(d) {
      var dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
      return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    });

    nodes.attr("cx", function(d) { return d.x; })
         .attr("cy", function(d) { return d.y; })
         .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  }

  function onControlZoomClicked(e) {
    var elmTarget = $(this)
    var scaleProcentile = 0.20;

    // Scale
    var currentScale = zoom.scale();
    var newScale;
    if(elmTarget.hasClass('control-zoom-in')) {
      newScale = currentScale * (1 + scaleProcentile);
    } else {
      newScale = currentScale * (1 - scaleProcentile);
    }
    newScale = Math.max(newScale, 0);

    // Translate
    var centerTranslate = [
      (graphWidth / 2) - (graphWidth * newScale / 2),
      (graphHeight / 2) - (graphHeight * newScale / 2)
    ];

    // Store values
    zoom
      .translate(centerTranslate)
      .scale(newScale);

    // Render transition
    graph.transition()
      .duration(500)
      .attr("transform", "translate(" + zoom.translate() + ")" + " scale(" + zoom.scale() + ")");

  }

  function onZoomChanged() {
    graph.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
  }

  function onNodeMouseDown(d) {
     d.fixed = true;
     d3.select(this).classed("sticky", true);
   }

  render();

})();

    </script>

  </body>
</html>
