var checkboxes = document.querySelectorAll(".checkbox");
const searchInput = document.querySelector("#search");
const Name=document.querySelector('#name');
const Language=document.querySelector('#language');
const Id=document.querySelector('#id');
const Bio=document.querySelector('#bio');
const Version=document.querySelector('#version');

let page=1;
const pageData=10;
// function myfunction(checkbox) {
//   if (checkbox.checked === true) {
//     checkboxes.forEach(function (checkbox) {
//       checkbox.checked = true;
//     });
//   } else {
//     checkboxes.forEach(function (checkbox) {
//       checkbox.checked = false;
//     });
//   }
// }
// const userdata = async () =>{
//   console.log(collectaData);
//   return collectaData;
// };
let data;
const displayUser = async ()=> {
  const skip =(page-1)*pageData;
  const loadurl = `data.json?limit=${pageData}&skip=${skip}`;
  const res = await fetch(loadurl);
  data = await res.json();
  // let data = await userdata();
  let html = "";
  data.forEach((val) => {
    let htmlsegment = `<tr>
                            <td>${val.name}</td>
                            <td>${val.language}</td>
                            <td>${val.id}</td>
                            <td>${val.bio}</td>
                            <td>${val.version}</td>
                        </tr>`;
    html += htmlsegment;
  });
  document.getElementById("tbody").innerHTML = html;
};
function filterData(userData) {
  let daaaata = data
    .filter((val) => {
      
      if (userData === "") {
        return val;
      } 
      else if (Name.checked==true && val.name.toLowerCase().includes(userData)) {
        console.log(val);
        return val;
      }
      else if (Language.checked==true && val.language.toLowerCase().includes(userData)) {
        console.log(val);
        return val;
      }
      else if (Id.checked==true && val.id.toLowerCase().includes(userData)) {
        console.log(val);
        return val;
      }
      else if (Bio.checked==true && val.bio.toLowerCase().includes(userData)) {
        console.log(val);
        return val;
      }
      else if (Version.checked==true && parseInt(val.version)===parseInt(userData)) {
        console.log(val);
        return val;
      }
      else if((Name.checked==false && Language.checked==false && Id.checked==false &&
        Bio.checked==false && Version.checked==false)&&(val.name.toLowerCase().includes(userData) ||
      val.language.toLowerCase().includes(userData) ||
      val.id.toLowerCase().includes(userData) ||
      val.bio.toLowerCase().includes(userData) || 
      parseInt(val.version)===parseInt(userData))){
        return val;
      }
    })
    .map((obj) => {
      const { name, language, id, bio, version } = obj;
      return `<tr>
                            <td>${name}</td>
                            <td>${language}</td>
                            <td>${id}</td>
                            <td>${bio}</td>
                            <td>${version}</td>
                            </tr>`;
    })
    .join("");
  document.getElementById("tbody").innerHTML = daaaata;
}
displayUser();
searchInput.addEventListener("input", function (e) {

  filterData(e.target.value.toLowerCase());
});
