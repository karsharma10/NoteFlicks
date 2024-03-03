export class AppConfiguration {
  public userId: string;
  public noteIdList: string[];

  constructor(userId: string, noteIdList: string[]) {
    this.userId = userId;
    this.noteIdList = noteIdList;
  }
}

