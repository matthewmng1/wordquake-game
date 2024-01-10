import axios from "axios";

const BASE_URL = process.env.REACT_APP_VERCEL_URL || "http://localhost:3001"

class WordQuakeGameApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}${endpoint}`;
    const params = (method === "get") ? data : {};
    try{
      return(await axios ({ url, method, data, params })).data;
    } catch(e){
      console.error("API Error:", e);
    }
  }

  static async getWordQuakeBoard(){
    let res = await this.request(`/`);
    return res;
  }

  static async checkValidWord(board, word){
    console.log("call checkValidWord")
    try{
      let res = await this.request(`/`, {board, word}, "post")
      return res;
    } catch (err){
      console.log(err)
    }
  }
}

export default WordQuakeGameApi;