import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class BibliesSqliteService {

  private urlJson = "../assets/json/bible_json.json";

  private db!: SQLiteObject;  // Definir la variable db como SQLiteDBConnection

  scriptInserts:string="";

  constructor(private sqlite: SQLite, private http: HttpClient) { }

  // montar backup
  private async loadSQLScript(db: SQLiteObject): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get("../assets/db/db_bible1909.sql", { responseType: 'text' }).subscribe(
        async (sqlScript: string) => {
          try {
            await this.executeSQLScript(sqlScript, db);
            resolve();
          } catch (error) {
            console.error("Error ejecutando el script SQL:", error);
            reject(error);
          }
        },
        (error) => {
          console.error("Error al cargar el archivo SQL:", error);
          reject(error);
        }
      );
    });
  }

  private async executeSQLScript(sqlScript: string, db: SQLiteObject): Promise<void> {
    const queries = sqlScript.split(";;"); // Dividir en sentencias SQL
    //console.log("nueva insercion",queries)
    for (const query of queries) {
      if (query.trim()) {
        await db.executeSql(query, []);
      }
    }
  }

  // Verificar si la base de datos existe
  async checkDatabaseExists(): Promise<boolean> {
    try {
      // Intentar abrir la base de datos, si no existe, lanzará un error
      this.db = await this.sqlite.create({
        name: 'biblia.db',
        location: 'default'  // La ubicación de la base de datos
      });
      console.log('cheched');
      return true; // Si no hubo error, la base de datos existe o se creó
    } catch (error) {
      console.error('Error al verificar existencia de la base de datos', error);
      return false;  // Si hay un error, la base de datos no existe
    }
  }

 // Inicializar la base de datos
public async createDatabase(): Promise<boolean> {
  try {
    // Crear la conexión con la base de datos
    const db = await this.sqlite.create({
      name: 'biblia.db',
      location: 'default',
    });

    this.db = db;
    console.log('Conexión establecida');

    // Crear la tabla
    await this.createTable(this.db);

    // Cargar datos iniciales y esperar a que termine
   // await this.loadInitialData(this.db);
    await this.loadSQLScript(this.db);
    console.log('Base de datos lista con datos cargados');
    return true;
  } catch (err) {
    console.error('Error al crear o abrir la base de datos:', err);
    return false;
  }
}

// Crear la tabla
private async createTable(db: SQLiteObject) {
  try {
    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS bible (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seccion TEXT,
        nombre_libro TEXT,
        capitulo INTEGER,
        versiculo INTEGER,
        texto TEXT
      )`,
      []
    );
    console.log('Tabla creada correctamente');
  } catch (error) {
    console.error('Error al crear la tabla:', error);
  }
}

// Cargar datos iniciales desde el JSON y esperar a que termine
private async loadInitialData(db: SQLiteObject): Promise<void> {
  return new Promise((resolve, reject) => {
    this.http.get<any[]>(this.urlJson).subscribe(
      async (verses: any[]) => {
        const sql =
          'INSERT INTO bible (seccion, nombre_libro, capitulo, versiculo, texto) VALUES (?, ?, ?, ?, ?)';

          this.scriptInserts = this.scriptInserts + " INSERT INTO bible (seccion, nombre_libro, capitulo, versiculo, texto) VALUES ";

        await this.executeInsert(verses, sql, db);

        localStorage.setItem("scriptSQL",this.scriptInserts);
        
        resolve(); // Indicar que terminó
      },
      (error) => {
        console.error('Error al cargar datos iniciales:', error);
        reject(error);
      }
    );
  });
}

// Insertar versículos
async executeInsert(verses: any[], sql: string, db: SQLiteObject) {
  for (let verse of verses) {
    try {
      await db.executeSql(sql, [
        verse.seccion,
        verse.nombre_libro,
        verse.capitulo,
        verse.versiculo,
        verse.texto,
      ]);
    } catch (error) {
      console.error('Error al insertar versículo:', error);
    }
  }
}

  // Consultar versículos por libro y capítulo
  async getVersesByBookAndChapter(bookName: string, chapter: number): Promise<any[]> {
    try {

       // Crear o abrir la base de datos
       const db = await this.sqlite.create({
        name: 'biblia.db',
        location: 'default'
      }).then(resp => {
        console.log("resp conection",resp)
        return resp;
      });
  
      // Ejecutar la consulta
      const result = await db.executeSql(
        'SELECT * FROM bible WHERE nombre_libro = ? AND capitulo = ?',
        [bookName, chapter]
      );
      let verses = [];
      for (let i = 0; i < result.rows.length; i++) {
        verses.push(result.rows.item(i));
      }
      return verses;
    } catch (error) {
      console.error('Error al obtener versículos:', error);
      return [];
    }
  }


  // Consultar capítulos únicos por libro
  async getUniqueChaptersByBook(bookName: string): Promise<number> {
    try {
      // Crear o abrir la base de datos
      const db = await this.sqlite.create({
        name: 'biblia.db',
        location: 'default'
      }).then(resp => {
        console.log("resp conection",resp)
        return resp;
      });
  
      // Ejecutar la consulta
      const result = await db.executeSql(
        'SELECT DISTINCT capitulo FROM bible WHERE nombre_libro = ?',
        [bookName]
      );
  
      // Retornar la cantidad de capítulos únicos
      return result.rows.length ?? 0;
    } catch (error) {
      console.error('Error al obtener capítulos únicos por libro:', error);
      return 0;
    }
  }


  // BUSQUEDA DE COUNCIDENCIA DE TEXTO
  async getCoincidencias(texto: string): Promise<any[]> {
    try {

       // Crear o abrir la base de datos
       const db = await this.sqlite.create({
        name: 'biblia.db',
        location: 'default'
      }).then(resp => {
        console.log("resp conection",resp)
        return resp;
      });
  
      // Ejecutar la consulta
      const result = await db.executeSql(
        "SELECT * FROM bible WHERE texto LIKE ? COLLATE NOCASE",
        [`%${texto}%`] // Comodines para búsqueda parcial
      );
      let verses = [];
      for (let i = 0; i < result.rows.length; i++) {
        verses.push(result.rows.item(i));
      }
      return verses;
    } catch (error) {
      console.error('Error al obtener versículos:', error);
      return [];
    }
  }

}
