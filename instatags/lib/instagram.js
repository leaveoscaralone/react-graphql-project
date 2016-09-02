window.Instagram = new function () {

  var _token = 'paste your token here';
  var _baseURL = 'https://api.instagram.com/v1/';

  /**
   * Merges the content of custom data object with a default one that contains
   * api client-wide information (like auth)
   * @param  {Object} data User defined data
   * @return {Object}      Merged data
   */
  var requestData = function (data) {
    var requestData = {access_token: _token};
    for (var userDataAttr in data) {
      requestData[userDataAttr] = data[userDataAttr];
    }
    return requestData;
  };

  /**
   * Searches for users via their username
   * @param  {String}   q  username search criteria
   * @param  {Function} cb handler of the result
   * @return {undefined}
   */
  this.searchUser = function (q, cb) {
    $.ajax({
      url: _baseURL + 'users/search',
      data: requestData({q: q}),
      success: function (response) {
        cb(response.data);
      },
      dataType: 'jsonp'
    });
  };

  /**
   * Gets detailed information of a user
   * @param  {String}   id the id of the user
   * @param  {Function} cb handler of the result
   * @return {undefined}
   */
  this.getUser = function (id, cb) {
    $.ajax({
      url: _baseURL + 'users/' + id,
      data: requestData(),
      success: function(response){
        cb(response.data);
      },
      dataType: 'jsonp'
    });
  };

  /**
   * Gets the recent pictures of a user in order of creation
   * @param  {String}   id the id of the user
   * @param  {Function} cb handler of the result
   * @return {undefined}
   */
  this.getUserRecentMedia = function (id, cb) {
    $.ajax({
      url: _baseURL + 'users/' + id + '/media/recent',
      data: requestData({count: 100}),
      dataType: 'jsonp',
      success: function (response) {
        cb(response.data);
      }
    });
  };

};
