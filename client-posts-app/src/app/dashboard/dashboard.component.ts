import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.interface';
import { UserService } from '../user.service';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: Post[];
  socket: SocketIOClient.Socket;
  constructor(private http: HttpClient, private user: UserService) {
    this.getAllPosts();
    this.socket = io('http://localhost:3000');
    this.socket.on('postUpdate', () => {
      this.getAllPosts();
    });
    this.socket.on('commentUpdate', () => {
      this.getAllPosts();
    });
  }

  ngOnInit() {
    // this.getAllPosts();
  }
  getAllPosts() {
    this.http.get('http://localhost:3000/api/posts').subscribe((data) => {
      this.posts = data['data'];
      console.log(this.posts);
    },
    (err) => {
      console.log(`error loading the posts`);
      }
    );
  }
  addPost(e) {
    const postTitle = (document.getElementById('userPostTitle')as HTMLInputElement).value;
    const postText = (document.getElementById('userPostText')as HTMLInputElement).value;
    if (postTitle !== '' && this.user.getUserId() !== undefined) {
        const postReq = this.http.post('http://localhost:3000/api/post', {
        userId: this.user.getUserId(),
        title: postTitle,
        text: postText
      }).subscribe((res) => {
        // console.log(res);
        if (res['success']) {
          this.socket.emit('post', res);
          // this.getAllPosts();
          (document.getElementById('userPostTitle')as HTMLInputElement).value = '';
          (document.getElementById('userPostText')as HTMLInputElement).value = '';
        }
    }, (err) => {
      console.log(err);
      });
    } else {
      console.log('Please enter the title');
    }
  }
  addComment(postId) {
    const commentText = (document.getElementById('commentText')as HTMLInputElement).value;
    if (commentText !== '' && this.user.getUserId() !== undefined) {
      const postComment = this.http.post('http://localhost:3000/api/comment', {
        text: commentText,
        userId: this.user.getUserId(),
        postId: postId
      }).subscribe((res) => {
        if (res['success']) {
          this.socket.emit('comment', res);
          // this.getAllPosts();
          (document.getElementById('commentText')as HTMLInputElement).value = '';
        }
      }, (err) => {
        console.log(err);
      });
    } else {
      console.log('Please enter a comment and hit the button');
    }
  }
}
