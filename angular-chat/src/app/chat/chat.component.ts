import { Component } from '@angular/core';
import { ChatService } from './chat.service';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: ChatMessage[] = [];
  userInput = '';
  loading = false;

  constructor(private chat: ChatService) {}

  send() {
    const text = this.userInput.trim();
    if (!text) return;
    this.messages.push({ role: 'user', text });
    this.userInput = '';
    const context = { history: this.messages };
    this.loading = true;
    this.chat.sendMessage(text, context).subscribe({
      next: chunk => this.handleChunk(chunk),
      error: err => {
        console.error(err);
        this.loading = false;
      },
      complete: () => (this.loading = false)
    });
  }

  private handleChunk(text: string) {
    const last = this.messages[this.messages.length - 1];
    if (last && last.role === 'bot') {
      last.text += text;
    } else {
      this.messages.push({ role: 'bot', text });
    }
  }
}
