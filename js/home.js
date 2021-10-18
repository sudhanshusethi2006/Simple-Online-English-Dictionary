const url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

function clearPage() {

    var definitionsDiv = document.getElementById("divDefinitions");
    definitionsDiv.innerHTML = '';
    document.getElementById("txtWord").value = '';
}

function getData() {

    var text = document.getElementById("txtWord").value;
    if (text === '') return;
    fetch(url + `${text}`).then(res => { return res.json() }).then(data => obj = data).then(() => callback(obj));
}


function callback(promise) {
    var definitionsDiv = document.getElementById("divDefinitions");
    definitionsDiv.innerHTML = '';
    var json_string = JSON.stringify(promise);

    const response = JSON.parse(json_string);

    if (typeof response[0] === 'undefined' || response[0] === null) {
        var divError = document.createElement("div");;
        divError.className = "errors";
        var notFoundtitle = document.createElement("p");
        notFoundtitle.appendChild(document.createTextNode(response.title));
        divError.appendChild(notFoundtitle);;
        var notFoundMessage = document.createElement("p");
        notFoundMessage.appendChild(document.createTextNode(response.message));
        divError.appendChild(notFoundMessage);
        var notFoundresolution = document.createElement("p");
        notFoundresolution.appendChild(document.createTextNode(response.resolution));
        divError.appendChild(notFoundresolution);
        definitionsDiv.appendChild(divError);
        return;
    }
    var definitions = response[0].meanings[0].definitions;

    if (definitions.length == 0) {
        var divError = document.createElement("div");;
        divError.className = "errors";
        var notFoundtitle = document.createElement("p");
        notFoundtitle.appendChild(document.createTextNode(response.title));
        divError.appendChild(notFoundtitle);;
        var notFoundMessage = document.createElement("p");
        notFoundMessage.appendChild(document.createTextNode(response.message));
        divError.appendChild(notFoundMessage);
        var notFoundresolution = document.createElement("p");
        notFoundresolution.appendChild(document.createTextNode(response.resolution));
        divError.appendChild(notFoundresolution);
        definitionsDiv.appendChild(divError);
        return;
    }

    for (let j = 0; j < definitions.length; j++) {
        var div = document.createElement("div");
        div.id = "div_" + j;

        definitionsDiv.appendChild(div);
        div.className = "card card-width definition-item";
        var divBody = document.createElement("div");
        divBody.className = "card-body";
        div.appendChild(divBody);

        var meaningsdiv = document.createElement("div");
        meaningsdiv.className = "row"
        var definitionLabel = document.createElement("h5");
        definitionLabel.className = "card-title";
        definitionLabel.appendChild(document.createTextNode("Meaning: "));
        meaningsdiv.appendChild(definitionLabel);

        var definitionLabelText = document.createElement("label");
        definitionLabelText.appendChild(document.createTextNode(definitions[j].definition));
        meaningsdiv.appendChild(definitionLabelText);

        divBody.appendChild(meaningsdiv);
        var examplediv = document.createElement("div");
        examplediv.className = "row"
        var exampleLabel = document.createElement("h5");
        exampleLabel.className = "card-title";
        exampleLabel.appendChild(document.createTextNode("Example : "));
        examplediv.appendChild(exampleLabel);

        var exampleLabelText = document.createElement("label");
        exampleLabelText.appendChild(document.createTextNode(definitions[j].example));
        examplediv.appendChild(exampleLabelText);
        divBody.appendChild(examplediv);

        if (definitions[j].synonyms.length > 0) {
            var synonymsdiv = document.createElement("div");
            synonymsdiv.className = "row"
            var synonymsLabel = document.createElement("h5");
            synonymsLabel.appendChild(document.createTextNode("Synonyms : "));
            synonymsLabel.className = "card-title";
            synonymsdiv.appendChild(synonymsLabel);

            var ul = document.createElement("ul");
            synonymsdiv.appendChild(ul);
            ul.className = "synonyms";
            for (let i = 0; i < definitions[j].synonyms.length; i++) {
                var li = document.createElement("Li");
                li.className = "synonyms-item";
                li.appendChild(document.createTextNode(definitions[j].synonyms[i]));
                ul.appendChild(li);
            }
            divBody.appendChild(synonymsdiv);
        }

    }


}