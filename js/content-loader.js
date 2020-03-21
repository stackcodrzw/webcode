


function load_home() {
     var newItemsHtml = '';
  var $cont = $('[data-boxes-cont]');
  var boxTemplate = $('[data-template]').html();
  
  var fakeData = [{
    title: 'Hello',
    content: 'This is just a Template'
}];

    fakeData.forEach(function(item) {
        newItemsHtml += boxTemplate
            .replace(/-title-/g, item.title)
            .replace(/-content-/g, item.content)
    });
  $cont.empty();
   $cont.append(newItemsHtml);
}

function load_hello() {
     var newItemsHtml = '';
  var $cont = $('[data-boxes-cont]');
  var boxTemplate = $('[data-template]').html();
  
  var fakeData = [{
    title: 'Hello',
    content: 'Dashboard'
}];

    fakeData.forEach(function(item) {
        newItemsHtml += boxTemplate
            .replace(/-title-/g, item.title)
            .replace(/-content-/g, item.content)
    });
  $cont.empty();
   $cont.append(newItemsHtml);
}
function load_timetable() {
  var $cont = $('[data-boxes-cont]');
  var boxTemplate = $('[timetable]').html();

  $cont.empty();
   $cont.append(boxTemplate);
}
function load_missing() {
  var $cont = $('[data-boxes-cont]');
  var boxTemplate = $('[missing-template]').html();

  $cont.empty();
   $cont.append(boxTemplate);
}
function load_dashboard() {
  var $cont = $('[data-boxes-cont]');
  var boxTemplate = $('[dashboard-template]').html();

  $cont.empty();
   $cont.append(boxTemplate);
}