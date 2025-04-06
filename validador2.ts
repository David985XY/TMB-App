// Definir la estructura de la parada de metro
export interface MetroParada {
    ID_ESTACIO: number;
    CODI_GRUP_ESTACIO: number;
    NOM_ESTACIO: string;
    PICTO: string;
    DATA: string;
  }
  
  /**
   * Valida si un objeto tiene la estructura de una parada de metro
   * @param obj - Objeto a validar
   * @returns {boolean} - true si el objeto es válido, false en caso contrario
   */
  export function validateMetroParada(obj: any): obj is MetroParada {
    return (
      typeof obj.ID_ESTACIO === "number" &&
      typeof obj.CODI_GRUP_ESTACIO === "number" &&
      typeof obj.NOM_ESTACIO === "string" &&
      typeof obj.PICTO === "string" &&
      typeof obj.DATA === "string"
    );
  }
  
  /**
   * Valida si un array de datos contiene solo paradas de metro válidas
   * @param data - Array de objetos a validar
   * @returns {boolean} - true si todos los elementos son paradas de metro válidas
   */
  export function validateMetroParadasData(data: any): data is MetroParada[] {
    return Array.isArray(data) && data.every(validateMetroParada);
  }
  