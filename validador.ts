// validators.ts

export interface MetroLine {
    ID_LINIA: number;
    CODI_LINIA: string;
    NOM_LINIA: string;
    DESC_LINIA: string;
    ORIGEN_LINIA: string;
    DESTI_LINIA: string;
    NOM_OPERADOR: string;
    HORARIO: string;
    FRECUENCIA_MINUTOS: {
      hora_pico: number;
      hora_valle: number;
      nocturno: number;
    };
    PARADAS: string[];
  }
  
  /**
   * Valida si un objeto tiene la estructura de una línea de metro
   * @param obj - Objeto a validar
   * @returns {boolean} - true si el objeto es válido, false en caso contrario
   */
  export function validateMetroLine(obj: any): obj is MetroLine {
    return (
      typeof obj.ID_LINIA === "number" &&
      typeof obj.CODI_LINIA === "string" &&
      typeof obj.NOM_LINIA === "string" &&
      typeof obj.DESC_LINIA === "string" &&
      typeof obj.ORIGEN_LINIA === "string" &&
      typeof obj.DESTI_LINIA === "string" &&
      typeof obj.NOM_OPERADOR === "string" &&
      typeof obj.HORARIO === "string" &&
      typeof obj.FRECUENCIA_MINUTOS === "object" &&
      typeof obj.FRECUENCIA_MINUTOS.hora_pico === "number" &&
      typeof obj.FRECUENCIA_MINUTOS.hora_valle === "number" &&
      typeof obj.FRECUENCIA_MINUTOS.nocturno === "number" &&
      Array.isArray(obj.PARADAS)
    );
  }
  
  /**
   * Valida si un array de datos contiene solo líneas de metro válidas
   * @param data - Array de objetos a validar
   * @returns {boolean} - true si todos los elementos son líneas de metro válidas
   */
  export function validateMetroData(data: any): data is MetroLine[] {
    return Array.isArray(data) && data.every(validateMetroLine);
  }
  