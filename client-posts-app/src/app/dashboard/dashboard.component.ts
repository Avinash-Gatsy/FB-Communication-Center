import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.interface';
import { UserService } from '../user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: Post[];
  constructor(private http: HttpClient, private user: UserService) {
    this.getAllPosts();
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
    if (postTitle !== '' && this.user.getUserId() !== '') {
        const postReq = this.http.post('http://localhost:3000/api/post', {
        userId: this.user.getUserId(),
        title: postTitle,
        text: postText
      }).subscribe((res) => {
        console.log(res);
        console.log(res['success']);
        this.getAllPosts();
    }, (err) => {
      console.log(err);
      });
    } else {
      console.log('Please enter the title');
    }
  }
}
