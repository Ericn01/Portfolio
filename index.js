document.addEventListener("DOMContentLoaded", () => {
    /* Progress bar display code (skills section) */
    const skillBar = document.querySelector("#skill-bar");
    // Tags container element
    const tagsContainer = document.querySelector(".skill-container");
    // Tag elements contained within the tags container
    const tags = document.querySelectorAll(".tag");
    // Adding an event listener to each tag 
    tags.forEach( (tag) => tag.addEventListener("mouseenter", displayProgressBar) );
    // Tag values, represented as objects
    const tagObj = [  {"tName": "react", "value": 55, "color": "#61DBFB"}, 
                      {"tName": "node", "value": 45, "color": "#68A063"}, 
                      {"tName": "regex", "value": 35, "color": "orangered"},
                      {"tName": "java", "value": 80, "color": "red"},
                      {"tName": "sql", "value": 90, "color": "violet"},
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
        tagsContainer.style.display = "block";
    }
    /* Work Showcase Divs Dynamic anchor - this removes the need forredundant anchor tags */
    const projectDivs = document.querySelectorAll(".project");
    projectDivs.forEach( (project) => project.addEventListener('click', () => window.open("other-pages/projects.html", "__self")));
})
