import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  public language:string;
  public languages = ['es', 'en'];
  constructor(
    private translate: TranslateService) { }

  public changeLanguage(){
    if(this.language == this.languages[0]){
      this.language = this.languages[1];
      this.translate.use(this.language);
    }else{
      this.language = this.languages[0];
      this.translate.use(this.language);
    }
  }
}
