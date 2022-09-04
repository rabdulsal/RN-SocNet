export class ContentItem {
  constructor(user, content) {
    this.user = user;
    this.content = content;
  }
}

export class User {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.photoURL = user.picture;
  }
}
