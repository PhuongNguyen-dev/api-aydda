import mongoose from 'mongoose';

// Chuỗi kết nối tới MongoDB
const uri: string = 'mongodb+srv://phuong-nguyen-211:Phuong211@cluster0.kwmp2fu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


export const initialDataBase = ()=>{

// Kết nối tới MongoDB
  mongoose.connect(uri)
    .then(() => console.log('Kết nối thành công tới MongoDB!'))
    .catch((err: Error) => console.error('Lỗi khi kết nối:', err));

}
