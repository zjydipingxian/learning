/**api链接 */
var apiUrl = "https://douban.uieee.com/v2/book/"; 
//
module.exports = {
  getBookById: apiUrl,
  searchBook: apiUrl + "search",
  getBookList: apiUrl + "series/:id/books"
}