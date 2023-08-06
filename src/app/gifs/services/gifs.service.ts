import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gif.interfaces';



@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private serviceUrl=   `https://api.giphy.com/v1/gifs`;
  private giphy_api_key=`1IU6EUwtPYfDuV84r3xDpUomRmqQVrd8`;
  public gifList:Gif[]=[];

  private _tagsHistory:string[]=[];
  constructor(private http:HttpClient) { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  searchTag(tag: string) {

    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params=new HttpParams()
    .set('api_key',this.giphy_api_key)
    .set('limit','10')
    .set('q',tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe(res=>{
      this.gifList=res.data;
    })

  }
  organizeHistory(tag: string) {


    tag=tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      console.log("entra aqui")
      this._tagsHistory=this._tagsHistory.filter((oldtag=>oldtag!==tag));
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory=this._tagsHistory.splice(0,10);
    console.log(this._tagsHistory)
  }
}
