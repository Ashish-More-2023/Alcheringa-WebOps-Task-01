


$(".user").on("click",(event)=>{

    $("#User-dropdown").slideToggle(500).toggleClass('show');
  

});

$(".s1").on("click",(event)=>{

    $("#sidemenu1").slideToggle(500).toggleClass('show');
  

});
$(".s2").on("click",(event)=>{

    $("#sidemenu2").slideToggle(500).toggleClass('show');
  

});
$(".s3").on("click",(event)=>{

    $("#sidemenu3").slideToggle(500).toggleClass('show');
  

});

    // Close the dropdown menu if the user clicks outside of it
 $(document).on("click", function(event) {
        if (!$(event.target).closest('.dropdown').length) {
          $(".dropdown-content").slideUp(500).removeClass('show');
        }
      });
 
$(".sidebar-button").on("click",(event)=>{

    $("#menu").slideToggle(500).toggleClass('show');

});
$(document).on("click", function(event) {
    if (!$(event.target).closest('.side-drop').length) {
      $(".sidedrop").slideUp(500).removeClass('show');
    }
  });



/*control side bar  */
$(document).ready(()=>{
    $(window).resize((event)=>{
        if ($(window).width() >= 500) {
            $("#menu").css("display", "block");
            $(".sidebar-button").hide();
        } else {
            $("#menu").css("display", "none");
            $(".sidebar-button").show();
        }
    });
});

/*Main Table */
var userData =[]
async function ToGetData(){
    const response = await fetch('https://dummyjson.com/users');
    if(response.status != 200){
        throw new Error('cannot fetch data');
    } else {
    const data = await response.json();
    return data;
    }
};

ToGetData().then((data)=>{
    console.log(data.users);
    userData = data.users;
    const info = userData;
    for(var i=0;i<info.length;i++){
        var fullname = info[i].firstName + " " + info[i].maidenName + " " + info[i].lastName ;
        $(".fetched-data").append(` 
    <tr class="row_data" row_id="${i}">
      <td contenteditable="false">
        ${fullname} 
      </td>
      <td contenteditable="false">
        ${info[i].username}
      </td>
      <td contenteditable="false">
        ${info[i].email}
      </td>
      <td>
      <div class="operations">
      <a href="#edit" class="edit buttons"><img src="./images/save.png"><span>Edit</span></a>
      <a href="#save" class="save buttons" style="display:none;"><img src="./images/save.png"><span>Save<span></a>
      <a  href="#delete" class="delete buttons"><img src="./images/save.png"><span>Delete</span></a>
      </div>  
      </td>
    </tr>`);
    }

});

$(document).on('click', '.edit', function (event) {
    event.preventDefault();
    var $row = $(this).closest('tr');
    $row.find('td').attr('contenteditable', 'true');
    $row.find('.edit').hide();
    $row.find('.save').show();
});

$(document).on('click', '.save', function (event) {
    event.preventDefault();
    var $row = $(this).closest('tr');
    var rowId = $row.attr('row_id');
    var cells = $row.find('td');
    // Update userData array
    var fullname = $(cells[0]).text().trim().split(" ");
    userData[rowId].firstName = fullname[0];
    userData[rowId].maidenName = fullname[1];
    userData[rowId].lastName = fullname[2];
    userData[rowId].username = $(cells[1]).text().trim();
    userData[rowId].email = $(cells[2]).text().trim();
    var $row = $(this).closest('tr');
    $row.find('td').attr('contenteditable', 'false');
    $row.find('.save').hide();
    $row.find('.edit').show();
    console.log('Updated userData:', userData); // For debugging
});



// Handle delete functionality
$(document).on('click', '.delete', function (e) {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this row?')) {
        var $row = $(this).closest('tr');
        var rowId = $row.attr('row_id');
        

        $row.remove();


        userData.splice(rowId, 1);


        console.log('Row deleted:', rowId);
        console.log('Updated userData:', userData);
    }
});

