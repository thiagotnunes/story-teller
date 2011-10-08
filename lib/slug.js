var strip = /[^\w\s-]/g
  , hyphen = /[-\s]+/g;

var map = {
  from: 'àáäãâèéëêìíïîòóöôõùúüûñç·/_,:;'
, to  : 'aaaaaeeeeiiiiooooouuuunc------'
};

module.exports = function slug(str) {
  
  for (var i=0, j=map.from.length; i<j; i++) {
    str = str.replace(new RegExp(map.from.charAt(i), 'g'), map.to.charAt(i));
  }
  
  return str.replace(strip, '').trim().toLowerCase().replace(hyphen, '-');
};