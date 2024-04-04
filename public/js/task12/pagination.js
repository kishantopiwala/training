const totalpages = 6
var current_page = 1;
const formcomponents = document.getElementsByClassName('formcomponents');

document.getElementById('previous').addEventListener('click', previous_page);
function page() {
    const basic_details = document.getElementById('Basic_details');
    const education_details = document.getElementById('Education_details');
    const work_details = document.getElementById('Work_details');
    const language_technologies = document.getElementById('Language_technologies');
    const referance_details = document.getElementById('Referance_details');
    const preferences_details = document.getElementById('Preferences_details');
    switch (current_page) {
        case 1:
            showelement(basic_details);
            hideelement(education_details)
            hideelement(work_details)
            hideelement(language_technologies)
            hideelement(referance_details)
            hideelement(preferences_details)
            break;
        case 2:
            showelement(education_details);
            hideelement(basic_details)
            hideelement(work_details)
            hideelement(language_technologies)
            hideelement(referance_details)
            hideelement(preferences_details)
            break;
        case 3:
            showelement(work_details);
            hideelement(basic_details)
            hideelement(education_details)
            hideelement(language_technologies)
            hideelement(referance_details)
            hideelement(preferences_details)
            break;
        case 4:
            showelement(language_technologies);
            hideelement(basic_details)
            hideelement(education_details)
            hideelement(work_details)
            hideelement(referance_details)
            hideelement(preferences_details)
            break;
        case 5:
            showelement(referance_details);

            hideelement(basic_details)
            hideelement(education_details)
            hideelement(language_technologies)
            hideelement(work_details)
            hideelement(preferences_details)
            break;
        case 6:
            showelement(preferences_details);
            console.log(current_page)
            hideelement(basic_details)
            hideelement(education_details)
            hideelement(language_technologies)
            hideelement(referance_details)
            hideelement(work_details)
            break;
        default:
            break;
    }
}
var showelement = (id) => {
    id.style.display = "block";
}
var hideelement = (id) => {
    id.style.display = 'none';
}
var hidealleleents = () => {
    for (const comp in formcomponents) {
        hideelement(formcomponents[comp])
    }
}
function next_page() {
    validate = true
    if (ajaxvalidateform() == true) {

        if (current_page < totalpages) {
            current_page = current_page + 1;
            page();
        }
        if (current_page == totalpages) {
            document.getElementById('next').style.display = 'none';
            document.getElementById('submit').style.display = '';
            current_page = totalpages
        }
    }
}
document.getElementById('next').addEventListener('click', next_page);
function previous_page() {
    document.getElementById('next').style.display = '';
    document.getElementById('submit').style.display = 'none';
    if (current_page > 1) {
        current_page = current_page - 1;
        page();
    }
    else {
        current_page = 1;
    }
}
