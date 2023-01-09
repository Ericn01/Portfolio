document.addEventListener("DOMContentLoaded", () => {
    /* Progress bar display code (skills section) */
    const skillBar = document.querySelector("#skill-bar");
    const tags = document.querySelectorAll(".tag");
    // Adding an event listener to each tag 
    tags.forEach( (tag) => tag.addEventListener("mouseover", displayProgressBar) );
    // Tag values, represented as objects
    const tagObj = [  {"tName": "react", "value": 75, "color": "#61DBFB"}, 
                      {"tName": "node", "value": 70, "color": "#68A063"}, 
                      {"tName": "regex", "value": 65, "color": "orangered"},
                      {"tName": "java", "value": 85, "color": "red"},
                      {"tName": "bash", "value": 60, "color": "lightgreen"},
                    ];
    function displayProgressBar() {
        const tagName = this.id // the ID of the tag that has been clicked
        const tagData = tagObj.find(tag => tag.tName == tagName); // finds the associated tag
        ({tName, value, color} = tagData); // Object destructuring
        styleProgressBar(value, color); // Styles accordingly
    }
    function styleProgressBar(value, color){
        skillBar.value = value;
        skillBar.style.accentColor = color;
        document.querySelector(".skill-container").style.display = "block";
    }
    /* Work Showcase Divs Dynamic anchor - this removes the need forredundant anchor tags */
    const projectDivs = document.querySelectorAll(".project");
    projectDivs.forEach( (project) => project.addEventListener('click', () => window.open("other-pages/projects.html", "__self")));
})
