export class FormClass {
    constructor() {}
    
    getErrorMessage(form, name) {
        const field = form.controls[name];
        let errorMessage = '';
        
        if (field.hasError('required')) {
            errorMessage = 'Данное поле дожно быть заполнено';
        } else if (name === 'email' && field.hasError('email')) {
            errorMessage = 'Введите корректное значение';
        } else if (field.hasError('minlength')) {
            errorMessage = 'Введите больше ' + field.errors.minlength.requiredLength + ' символов';
        } else if (field.hasError('maxlength')) {
            errorMessage = 'Максимальное количество символов ' + field.errors.maxlength.requiredLength;
        }
        return errorMessage;
    }
}