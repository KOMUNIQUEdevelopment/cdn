$('#form').each(function(i, el) {
    form = $(el);
    form.submit(function(e) {
        //stop the form from submitting
        e.preventDefault();
        form = $(e.target);
        const formData = new FormData(e.target);
        const submittionData = {}
            // extract formData
        for (const [key, value] of formData) {
            submittionData[key] = value
        }
        fetch(form.attr('action'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...submittionData
            })
        }).then((response) => { // enter you logic when the fetch is successful
            form.hide() // optional hiding of form
                .siblings('.w-form-done').show() // Show success
                .siblings('.w-form-fail').hide(); // Hide failure
        }).catch((err) => {
            console.log(err)
            form.siblings('.w-form-done').hide() // Hide success
                .siblings('.w-form-fail').show(); // show failure
        })
    });
});
