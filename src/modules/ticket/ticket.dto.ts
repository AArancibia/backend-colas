import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNotIn,
  IsNumber,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Clase TicketDto - para request en algun controlador
 * @class
 */
export class TicketDto {
  /**
   * Id de la Tematica
   */
  @ApiModelProperty()
  @IsNotEmpty({
    message: 'Valor no debe ser nulo',
  })
  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'El valor tiene que ser numero',
    },
  )
  idreferencial: number;

  /**
   * Campo preferencial
   */
  @ApiModelProperty()
  @IsNotEmpty()
  @IsBoolean({
    message: 'El valor tiene que ser verdadero o falso',
  })
  preferencial: boolean;
}

/**
 * Clase TicketRO - para response hacia el frontend
 * @class
 */
export class TicketRO {
  /**
   * Id del Ticket
   */
  @ApiModelProperty()
  idticket: number;
  /**
   * Codigo del Ticket
   */
  @ApiModelProperty()
  codigo: string;
  /**
   * Fecha de creacion del Ticket
   */
  @ApiModelProperty()
  fecha: string;
  /**
   * Id del Administrado
   */
  @ApiModelProperty()
  idadministrado: number;
  /**
   * Id del Tipo de Ticket
   */
  @ApiModelProperty()
  idtipoticket: number;
  /**
   * Id del Tipo de Tematica
   */
  @ApiModelProperty()
  idtematica: number;
  @ApiModelProperty()
  /**
   * Id del Tramite
   */
  idtramite: number;
  /**
   * Campo preferencial
   */
  @ApiModelProperty()
  preferencial: boolean;
  /**
   * Campo urgente
   */
  @ApiModelProperty()
  urgente: boolean;
  /**
   * Id de la Ventanilla
   */
  @ApiModelProperty()
  idventanilla: number;
}
