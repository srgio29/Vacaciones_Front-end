import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Cargo, Empleado } from 'src/app/api/models';
import { CargoControllerService, EmpleadoCargoControllerService, EmpleadoControllerService } from 'src/app/api/services';

@Component({
selector: 'app-empleado',
templateUrl: './empleado.component.html',
styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit{

  empleado: Empleado[]=[];
  cargo:Cargo[]=[];
  visible:boolean=false;


  constructor(
    private empleadoService: EmpleadoControllerService,
    private cargoService: CargoControllerService,
    private messageService: NzMessageService,
    private fb: FormBuilder
  ) {}

  formEmpleado: FormGroup = this.fb.group({
    id: [],
    nombre:[],
    fechaIngreso:[],
    cargoid:[],
    disponible:[]
  })

  ngOnInit(): void {
    this.empleadoService.find().subscribe(data=>this.empleado=data)
    this.cargoService.find().subscribe(data=>this.cargo=data)
  }

  eliminar(id:string):void{
    this.empleadoService.deleteById({id}).subscribe(()=>
    {
      this.empleado=this.empleado.filter(x => x.id !== id);
      this.messageService.info('El registro ha sido eliminado!')
    })  
  }

  cancel(id?:string):void{
    this.messageService.info('El registro seguira disponible y activo!')
    
  }

  ocultar():void{
    this.visible=false
  }

  mostrar(data?:Empleado):void{
    this.visible=true
  }

  guardar():void{
   console.log(this.formEmpleado.value)
  }
}  




