export const validateAppointment = (patient) => {

    for (const key in patient) {
        // if (key == 'phone') {
        //     if (patient[key].length < 10 || patient[key].length > 10)
        //         return `${key} should be 10 digits long!`
        // }
        if (patient[key] == '') {
            return `${key} is Required!`
        }
    }

    return `success`;

}