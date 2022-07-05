export class Habitacion {
  constructor(
    public _id:String,
    public nombre:String,
    public descripcion:String,
    public espacio:Number,
    public verificar:Boolean,
    public disponibilidad:String,
    public precio:Number,
    public idHotel:String,
    public idUsuario:String
  ){}
}
