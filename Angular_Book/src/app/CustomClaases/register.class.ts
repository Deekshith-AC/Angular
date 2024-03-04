export class RegisterUser
{
    FullName!: string;
    Email!: string;
    Password!: string;
    ConfirmPassword!: string;

    constructor(FullName: string, Email: string, Password: string, ConfirmPassword: string)
    {
        this.FullName = FullName;
        this.Email = Email;
        this.Password = Password;
        this.ConfirmPassword = ConfirmPassword;
    }

}