function activateMajor(checkbox) {
    if(checkbox.checked == true){
        document.getElementById("BIOE").disabled = false;
        document.getElementById("CET").disabled = false;
        document.getElementById("CHEM").disabled = false;
        document.getElementById("CLVE").disabled = false;
        document.getElementById("CSE").disabled = false;
        document.getElementById("CSET").disabled = false;
        document.getElementById("EE").disabled = false;
        document.getElementById("EET").disabled = false;
        document.getElementById("ENVE").disabled = false;
        document.getElementById("IT").disabled = false;
        document.getElementById("ME").disabled = false;
        document.getElementById("MET").disabled = false;

    }else{
        document.getElementById("BIOE").disabled = true;
        document.getElementById("CET").disabled = true;
        document.getElementById("CHEM").disabled = true;
        document.getElementById("CLVE").disabled = true;
        document.getElementById("CSE").disabled = true;
        document.getElementById("CSET").disabled = true;
        document.getElementById("EE").disabled = true;
        document.getElementById("EET").disabled = true;
        document.getElementById("ENVE").disabled = true;
        document.getElementById("IT").disabled = true;
        document.getElementById("ME").disabled = true;
        document.getElementById("MET").disabled = true;
    }
}

function activateHiring(checkbox) {
    if(checkbox.checked == true){
        document.getElementById("hireSelect").disabled = false;

    }else{
        document.getElementById("hireSelect").disabled = true;
    }
}

function activateMaster(checkbox) {
    if(checkbox.checked == true){
        document.getElementById("masterSelect").disabled = false;

    }else{
        document.getElementById("masterSelect").disabled = true;
    }
}

function activatePhd(checkbox) {
    if(checkbox.checked == true){
        document.getElementById("phdSelect").disabled = false;

    }else{
        document.getElementById("phdSelect").disabled = true;
    }
}

function activateUs(checkbox) {
    if(checkbox.checked == true){
        document.getElementById("usSelect").disabled = false;

    }else{
        document.getElementById("usSelect").disabled = true;
    }
}

function activateChecks() {
    activateMajor(document.getElementById("major"));
    activateHiring(document.getElementById("hireSelect"));
    activateMaster(document.getElementById("masterSelect"));
    activatePhd(document.getElementById("phdSelect"));
    activateUs(document.getElementById("usSelect"));
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('major');
    link.addEventListener("change", function() {
        activateMajor(link);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('hiring');
    link.addEventListener("change", function() {
        activateHiring(link);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('master');
    link.addEventListener("change", function() {
        activateMaster(link);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('phd');
    link.addEventListener("change", function() {
        activatePhd(link);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('us');
    link.addEventListener("change", function() {
        activateUs(link);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('us');
    link.addEventListener("change", function() {
        activateUs(link);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    activateChecks();
});

function getMajorStates() {
    var majorStates = {major:false, BIOE:false, CET:false, CHEM:false,
        CLVE:false, CSE:false, CSET:false, EE:false,
        EET:false, ENVE:false, IT:false, ME:false, MET:false, };

    if (document.getElementById("major").checked){
        majorStates.major = true;
        majorStates.BIOE = document.getElementById("BIOE").checked;
        majorStates.CET = document.getElementById("CET").checked;
        majorStates.CHEM = document.getElementById("CHEM").checked;
        majorStates.CLVE = document.getElementById("CLVE").checked;
        majorStates.CSE = document.getElementById("CSE").checked;
        majorStates.CSET = document.getElementById("CSET").checked;
        majorStates.EE = document.getElementById("EE").checked;
        majorStates.EET = document.getElementById("EET").checked;
        majorStates.ENVE = document.getElementById("ENVE").checked;
        majorStates.IT = document.getElementById("IT").checked;
        majorStates.ME = document.getElementById("ME").checked;
        majorStates.MET = document.getElementById("MET").checked;
    }

    return majorStates;
}

function getFiltersStates() {
    var states = {majorStates:null, hiringStates:null, masterStates:null, phdStates:null, usStates:null};

    states.majorStates = getMajorStates();

    return states;
}

function filterClick() {
    chrome.tabs.executeScript(null,
        {file: "content.js"});

    //window.close();
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('filter');
    link.addEventListener("click", function() {
        var dataForFilter = getFiltersStates();
        filterClick();
        document.dispatchEvent(new CustomEvent('csEvent', {detail: dataForFilter}));
    });
});






/**
 * Copied stuff
 *
 *
 *
 *
 */
/*function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs) {
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        var tab = tabs[0];

        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;

        // tab.url is only available if the "activeTab" permission is declared.
        // If you want to see the URL of other tabs (e.g. after removing active:true
        // from |queryInfo|), then the "tabs" permission is required to see their
        // "url" properties.
        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });

}

function isPageCorrect() {

}

/!**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 *!/
function getImageUrl(searchTerm, callback, errorCallback) {
    // Google image search - 100 searches per day.
    // https://developers.google.com/image-search/
    var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
        '?v=1.0&q=' + encodeURIComponent(searchTerm);
    var x = new XMLHttpRequest();
    x.open('GET', searchUrl);
    // The Google image search API responds with JSON, so let Chrome parse it.
    x.responseType = 'json';
    x.onload = function() {
        // Parse and process the response from Google Image Search.
        var response = x.response;
        if (!response || !response.responseData || !response.responseData.results ||
            response.responseData.results.length === 0) {
            errorCallback('No response from Google Image search!');
            return;
        }
        var firstResult = response.responseData.results[0];
        // Take the thumbnail instead of the full image to get an approximately
        // consistent image size.
        var imageUrl = firstResult.tbUrl;
        var width = parseInt(firstResult.tbWidth);
        var height = parseInt(firstResult.tbHeight);
        console.assert(
            typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
            'Unexpected respose from the Google Image Search API!');
        callback(imageUrl, width, height);
    };
    x.onerror = function() {
        errorCallback('Network error.');
    };
    x.send();
}

function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function(url) {
        // Put the image URL in Google search.
        renderStatus('Performing Google Image search for ' + url);

        getImageUrl(url, function(imageUrl, width, height) {

            renderStatus('Search term: ' + url + '\n' +
                'Google image search result: ' + imageUrl);
            var imageResult = document.getElementById('image-result');
            // Explicitly set the width/height to minimize the number of reflows. For
            // a single image, this does not matter, but if you're going to embed
            // multiple external images in your page, then the absence of width/height
            // attributes causes the popup to resize multiple times.
            imageResult.width = width;
            imageResult.height = height;
            imageResult.src = imageUrl;
            imageResult.hidden = false;

        }, function(errorMessage) {
            renderStatus('Cannot display image. ' + errorMessage);
        });
    });
});*/
/**
 * Copied stuff
 *
 *
 *
 *
 */

