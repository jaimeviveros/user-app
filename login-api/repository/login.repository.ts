import { UserDto } from "../dto/user.dto";

const user_list: UserDto[] = [
    {
        username: 'mclovin',
        password: '$2a$12$e402/IbtlCU/bzmgkzaOSu.w7qpu7LK/Rb4bCR14uJgWoRdNwpfw.',
        fullname: 'Chris Mintz'
    }
]

export class LoginRepository {

    public getUserByName(username: string) {
        return user_list.find(e => e.username === username);
    }

}