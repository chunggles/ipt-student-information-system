import './Sidebar.css'
function Sidebar() {
  return (
    <div className="sidebar-container">
      <ul>
        <li><a href="/"><b>HOME</b></a></li>
        <li><a href="/addstudents"><b>ADD STUDENT</b></a></li>
        <li><a href="/car"><b>CAR</b></a></li>
        <li><a href="/users"><b>USERS</b></a></li>
        <li><a href="/moviewatchlist"><b>MOVIE WATCHLIST</b></a></li>
      </ul>
    </div>
  ) 
}
export default Sidebar;