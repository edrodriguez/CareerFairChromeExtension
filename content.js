/**
 * Created by edrom on 7/21/2017.
 */

//Something like this in this place without any function or anything works for changing the contents of the page
/*
document.body.style.background = 'yellow';
*/
function generateMajorRegex(majorStates){
    var regexes = new Array;

    if (!majorStates.major) //if major is not selected just quit
        return;
    else {
        if (majorStates.BIOE)
            regexes.push("BIOE");
        if (majorStates.CET)
            regexes.push("CET");
        if (majorStates.CHEM)
            regexes.push("CHEM");
        if (majorStates.CLVE)
            regexes.push("CLVE");
        if (majorStates.CSE)
            regexes.push("CSE");
        if (majorStates.CSET)
            regexes.push("CSET");
        if (majorStates.EE)
            regexes.push("EE");
        if (majorStates.EET)
            regexes.push("EET");
        if (majorStates.ENVE)
            regexes.push("ENVE");
        if (majorStates.IT)
            regexes.push("IT");
        if (majorStates.ME)
            regexes.push("ME");
        if (majorStates.MET)
            regexes.push("MET");
    }

    return regexes;
}

document.addEventListener('csEvent', function (event) {
    var data = event.detail;

    var tableClass = 'fill border company_listing';
    var companies = document.getElementsByClassName(tableClass);
    var companiesBody = document.getElementsByClassName('fill company_listing_body');

    var majorRegexes = generateMajorRegex(data.majorStates);

    for (var i = 0; i < companies.length; i++){
        var majorFound = false;
        //check for major
        var majorField = companiesBody[i].rows[1].cells[2].innerHTML;

        for (var i = 0; i < majorRegexes.length; i++){
            var s = majorRegexes[i];
            if (majorField.search(s)){
                majorFound = true;
                break;
            }

        }
        if (majorFound)//contains major
            continue;
        else
            companies[i].style.display = 'none'; //temporary, need to change to account for multiple majors
    }
});

function filterMajor(table) {
    alert("majorcalled");
    var contentRow = table.rows.length[1].innerHTML;
    alert(contentRow);
}
