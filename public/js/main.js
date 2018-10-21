window.getCookie = function(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}
role = window.getCookie('role');
console.log(role)

document.getElementById("role").getElementsByTagName('option')[role].selected = 'selected';