import { Injectable, Inject } from '@angular/core';



@Injectable()
export class MessageService {

    messages: string[] = [];

    add(message: string)
    {
        this.messages.push(message);
    }

    clear()
    {
        this.messages = [];
    }
}