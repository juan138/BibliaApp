import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class BibliesSqliteService {

  private urlJson = "../assets/json/bible_json.json";

  private db!: SQLiteObject;  // Definir la variable db como SQLiteDBConnection

  constructor(private sqlite: SQLite, private http: HttpClient) { }

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
  public async createDatabase(): Promise<boolean>  {
    try {
      // Crear la conexión con la base de datos
      return await this.sqlite.create({
        name: 'biblia.db',  // Nombre de la base de datos
        location: 'default' // Ubicación por defecto en Cordova
      }).then(resp=>{
        this.db = resp;
        console.log('Conexión establecida');
        this.createTable(this.db);
        return true;
      });
    } catch (error) {
      console.error('Error al crear o abrir la base de datos:', error);
      return false;
    }
  }

  // Crear la tabla
  private async createTable(db: SQLiteObject) {
    try {
      await db.executeSql(`CREATE TABLE IF NOT EXISTS bible (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seccion TEXT,
        nombre_libro TEXT,
        capitulo INTEGER,
        versiculo INTEGER,
        texto TEXT
      )`, []);
      console.log('Tabla creada correctamente');
      this.loadInitialData(db); // Cargar los datos iniciales si es necesario
      console.log('datos creados correctamente');
    } catch (error) {
      console.error('Error al crear la tabla:', error);
    }
  }

  // Cargar datos iniciales desde el JSON
  private async loadInitialData(db: SQLiteObject) {
    this.http.get<any[]>(this.urlJson).subscribe((verses: any[]) => {
      const sql = 'INSERT INTO bible (seccion, nombre_libro, capitulo, versiculo, texto) VALUES (?, ?, ?, ?, ?)';
      this.executeInsert(verses, sql,db);
    });
  }

  // Insertar versículos
  async executeInsert(verses: any, sql: string,db: SQLiteObject) {
    for (let verse of verses) {
      try {
        await db.executeSql(sql, [verse.seccion, verse.nombre_libro, verse.capitulo, verse.versiculo, verse.texto]);
        //console.log(`Versículo insertado: ${verse.nombre_libro} ${verse.capitulo}:${verse.versiculo}`);
      } catch (error) {
        console.error('Error al insertar versículo:', error);
      }
    }
    return true;
  }

  // Consultar un versículo específico
  public async getVerseByReference(book: string, chapter: number, verse: number) {
    try {
      const result = await this.db.executeSql(
        'SELECT * FROM bible WHERE nombre_libro = ? AND capitulo = ? AND versiculo = ?',
        [book, chapter, verse]
      );
      return result.rows.length > 0 ? result.rows.item(0) : null;
    } catch (error) {
      console.error('Error al obtener versículo por referencia:', error);
      return null;
    }
  }

  // Consultar versículos por libro y capítulo
  async getVersesByBookAndChapter(bookName: string, chapter: number): Promise<any[]> {
    try {
      const result = await this.db.executeSql(
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

  // Consultar todos los versículos
  async getAllVerses(): Promise<any[]> {
    try {
      const result = await this.db.executeSql('SELECT * FROM bible', []);
      let verses = [];
      for (let i = 0; i < result.rows.length; i++) {
        verses.push(result.rows.item(i));
      }
      return verses;
    } catch (error) {
      console.error('Error al obtener todos los versículos:', error);
      return [];
    }
  }

  // Consultar capítulos únicos por sección
  async getUniqueChaptersBySection(section: string): Promise<any[]> {
    try {
      const result = await this.db.executeSql(
        'SELECT nombre_libro, COUNT(DISTINCT capitulo) AS total_capitulos FROM bible WHERE seccion = ? GROUP BY nombre_libro',
        [section]
      );
      let chapters = [];
      for (let i = 0; i < result.rows.length; i++) {
        chapters.push(result.rows.item(i));
      }
      return chapters;
    } catch (error) {
      console.error('Error al obtener capítulos únicos por sección:', error);
      return [];
    }
  }

  // Consultar capítulos por libro
  async getAllChaptersByBook(bookName: string): Promise<any[]> {
    try {
      const result = await this.db.executeSql(
        'SELECT capitulo, versiculo, texto FROM bible WHERE nombre_libro = ? ORDER BY capitulo, versiculo',
        [bookName]
      );

      // Agrupar los versículos por capítulo
        const chapters: Record<string, { capitulo: number, nombre_libro: string, versiculos: any[] }> = {};

        for (let i = 0; i < result.rows.length; i++) {
          const { capitulo, versiculo, texto } = result.rows.item(i);
          if (!chapters[capitulo]) {
            chapters[capitulo] = { capitulo, nombre_libro: bookName, versiculos: [] };
          }
          chapters[capitulo].versiculos.push({ versiculo, texto });
        }

        return Object.values(chapters);
    } catch (error) {
      console.error('Error al obtener capítulos por libro:', error);
      return [];
    }
  }

  // Consultar capítulos únicos por libro
  async getUniqueChaptersByBook(bookName: string): Promise<number> {
    try {
      if (!this.db) {
        console.error('La base de datos no está abierta');
        return 0;
      }

      const result = await this.db.executeSql(
        'SELECT DISTINCT capitulo FROM bible WHERE nombre_libro = ?',
        [bookName]
      );

      return result.rows.length;  // Devuelve el número de capítulos únicos
    } catch (error) {
      console.error('Error al obtener capítulos únicos por libro:', error);
      return 0;
    }
  }
}
