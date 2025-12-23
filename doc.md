# 📚 Documentation Complète du Projet GEDPro

Documentation exhaustive de la structure, du code et de l'architecture du projet GEDPro.

---

## 📋 Table des Matières

1. [Vue d'Ensemble](#vue-densemble)
2. [Structure du Projet](#structure-du-projet)
3. [Dossier `src/` - Détails Complets](#dossier-src---détails-complets)
4. [Architecture et Concepts](#architecture-et-concepts)
5. [Modules Métier](#modules-métier)
6. [Prochaines Étapes](#prochaines-étapes)

---

## 🎯 Vue d'Ensemble

### Qu'est-ce que GEDPro ?

GEDPro est une **Plateforme GED RH Intelligente** développée avec NestJS, permettant aux équipes RH de :
- Gérer les candidats et leurs dossiers
- Uploader et analyser des documents (OCR, extraction de compétences)
- Organiser des réunions/entretiens avec synchronisation calendrier
- Créer des formulaires dynamiques RH

### Stack Technologique

```
┌─────────────────────────────────────────┐
│         Application GEDPro              │
├─────────────────────────────────────────┤
│  Backend: NestJS (Node.js/TypeScript)   │
│  Base de données: MongoDB + PostgreSQL  │
│  Stockage: MinIO                        │
│  Authentification: JWT                  │
│  Tests: Jest                            │
└─────────────────────────────────────────┘
```

---

## 📁 Structure du Projet

### Structure Racine

```
GEDPro/
├── src/                   #**** 📂 Code source de l'application
│   ├── main.ts            # Point d'entrée
│   ├── app.module.ts      # Module racine
│   ├── app.controller.ts  # Contrôleur racine
│   ├── app.service.ts     # Service racine
│   └── modules/           # Modules métier
│
├── dist/                   # 📦 Code compilé (généré)
├── test/                   # 🧪 Tests end-to-end
├── node_modules/           # 📚 Dépendances npm
│
├── package.json            # ⚙️ Configuration npm
├── tsconfig.json           # ⚙️ Configuration TypeScript
└── nest-cli.json           # ⚙️ Configuration NestJS CLI
```

### Structure Détaillée de `src/`

```
src/
├── main.ts                          # 🚀 Point d'entrée
├── app.module.ts                    # 📦 Module racine
├── app.controller.ts                # 🎮 Contrôleur racine
├── app.service.ts                   # 🔧 Service racine
├── app.controller.spec.ts           # ✅ Tests contrôleur
│
└── modules/                         # 📚 Modules métier
    ├── auth/                        # 🔐 Authentification
    │   └── auth.module.ts
    │
    ├── users/                       # 👥 Utilisateurs
    │   └── users.module.ts
    │
    ├── documents/                   # 📄 Documents
    │   └── documents.module.ts
    │
    ├── meetings/                    # 📅 Réunions
    │   └── meetings.module.ts
    │
    └── condidates/                  # 👤 Candidats (complet)
        ├── condidates.module.ts
        ├── condidates.controller.ts
        ├── condidates.service.ts
        ├── condidates.controller.spec.ts
        ├── condidates.service.spec.ts
        ├── dto/
        │   ├── create-condidate.dto.ts
        │   └── update-condidate.dto.ts
        └── entities/
            └── condidate.entity.ts
```

---

## 📂 Dossier `src/` - Détails Complets

### 🎯 Vue d'Ensemble de `src/`

Le dossier `src/` est le **cœur de l'application NestJS**. Il contient tout le code source TypeScript qui sera compilé en JavaScript pour l'exécution.

**Rôle** : Contient tout le code source de l'application NestJS.

**Contenu** :
- Fichiers racine de l'application (main.ts, app.module.ts, etc.)
- Dossier `modules/` contenant tous les modules métier

---

## 📄 Fichier : `src/main.ts`

### 🎯 Rôle Principal

**Point d'entrée de l'application** - C'est le premier fichier exécuté quand vous démarrez l'application. Il initialise NestJS et démarre le serveur HTTP.

### 📝 Code Complet

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

### 🔍 Analyse Ligne par Ligne

#### Ligne 1 : `import { NestFactory } from '@nestjs/core';`
- **Rôle** : Importe la classe `NestFactory` depuis le package NestJS
- **Fonction** : `NestFactory` est une classe statique qui permet de créer une instance de l'application NestJS
- **Pourquoi** : C'est la méthode officielle pour démarrer une application NestJS

#### Ligne 2 : `import { AppModule } from './app.module';`
- **Rôle** : Importe le module racine de l'application
- **Fonction** : `AppModule` contient toute la configuration de l'application (modules, contrôleurs, services)
- **Chemin relatif** : `./app.module` signifie "dans le même dossier que main.ts"

#### Lignes 4-7 : Fonction `bootstrap()`
- **Type** : Fonction asynchrone (`async`)
- **Pourquoi async** : La création de l'application et l'écoute du serveur sont des opérations asynchrones

##### Ligne 5 : `const app = await NestFactory.create(AppModule);`
- **Rôle** : Crée une instance de l'application NestJS
- **Processus** :
  1. Analyse `AppModule` et tous ses imports
  2. Crée une instance de l'application avec toute sa configuration
  3. Initialise tous les modules, contrôleurs, services
- **Résultat** : `app` est une instance de `INestApplication` prête à être utilisée

##### Ligne 6 : `await app.listen(process.env.PORT ?? 3000);`
- **Rôle** : Démarre le serveur HTTP et écoute sur un port
- **`process.env.PORT`** : Variable d'environnement pour le port (si définie)
- **`?? 3000`** : Opérateur de coalescence nulle - utilise 3000 si `PORT` n'est pas défini
- **`await`** : Attend que le serveur soit prêt avant de continuer
- **Résultat** : Le serveur écoute sur le port spécifié (par défaut 3000)

#### Ligne 8 : `bootstrap();`
- **Rôle** : Appelle la fonction bootstrap pour démarrer l'application
- **Pourquoi ici** : Doit être appelée au niveau racine du fichier

### 🔄 Flux d'Exécution

```
┌───────────────────────────────────┐
│  1. Node.js exécute main.ts       │
└──────────────┬────────────────────┘
               │
               ▼
┌───────────────────────────────────┐
│  2. Importe les dépendances       │
│     - NestFactory                 │
│     - AppModule                   │
└──────────────┬────────────────────┘
               │
               ▼
┌───────────────────────────────────┐
│  3. Appelle bootstrap()           │
└──────────────┬────────────────────┘
               │
               ▼
┌───────────────────────────────────┐
│  4. Crée l'application NestJS     │
│     avec AppModule                │
└──────────────┬────────────────────┘
               │
               ▼
┌───────────────────────────────────┐
│  5. Démarre le serveur HTTP       │
│     sur le port 3000              │
└──────────────┬────────────────────┘
               │
               ▼
┌───────────────────────────────────┐
│  6. Application prête à recevoir  │
│     des requêtes                  │
└───────────────────────────────────┘
```

### 💡 Points Importants

- **Asynchrone** : Utilise `async/await` car les opérations réseau sont asynchrones
- **Configuration** : Le port peut être configuré via variable d'environnement
- **Point unique d'entrée** : Toute l'application démarre depuis ce fichier

---

## 📄 Fichier : `src/app.module.ts`

### 🎯 Rôle Principal

**Module racine de l'application** - C'est le module principal qui orchestre tous les autres modules. NestJS utilise ce module pour comprendre la structure complète de l'application.

### 📝 Code Complet

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { MeetingsModule } from './modules/meetings/meetings.module';
import { CondidatesModule } from './modules/condidates/condidates.module';

@Module({
  imports: [AuthModule, UsersModule, DocumentsModule, MeetingsModule, CondidatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 🔍 Analyse Détaillée

#### Lignes 1-8 : Imports
- **Ligne 1** : Importe le décorateur `@Module` de NestJS
- **Lignes 2-3** : Importe les composants racine (controller et service)
- **Lignes 4-8** : Importe tous les modules métier de l'application

#### Ligne 10 : `@Module({ ... })`
- **Rôle** : Décorateur qui transforme la classe en module NestJS
- **Fonction** : Indique à NestJS que cette classe est un module et comment le configurer

#### Propriétés du Module

##### `imports: [...]`
- **Rôle** : Liste des modules importés dans ce module
- **Fonction** : Permet d'utiliser les services et contrôleurs des modules importés
- **Modules importés** :
  - `AuthModule` : Authentification et sécurité
  - `UsersModule` : Gestion des utilisateurs
  - `DocumentsModule` : Gestion documentaire
  - `MeetingsModule` : Gestion des réunions
  - `CondidatesModule` : Gestion des candidats

**Comment ça marche** :
- Quand vous importez un module, vous pouvez utiliser ses services exportés
- Les contrôleurs du module importé sont automatiquement enregistrés
- Les routes de ces contrôleurs deviennent disponibles

##### `controllers: [AppController]`
- **Rôle** : Liste des contrôleurs déclarés dans ce module
- **Fonction** : Enregistre les routes définies dans `AppController`
- **Résultat** : Les endpoints de `AppController` sont disponibles dans l'application

##### `providers: [AppService]`
- **Rôle** : Liste des services (providers) déclarés dans ce module
- **Fonction** : Crée une instance du service et la rend disponible pour injection
- **Injection de dépendance** : Les contrôleurs peuvent injecter ce service

#### Ligne 15 : `export class AppModule {}`
- **Rôle** : Classe vide qui représente le module
- **Export** : Permet d'importer ce module ailleurs (comme dans `main.ts`)

### 🔄 Flux d'Initialisation

```
┌─────────────────────────────────────────┐
│  NestJS lit AppModule                   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Analyse tous les modules dans imports  │
│  - AuthModule                           │
│  - UsersModule                          │
│  - DocumentsModule                      │
│  - MeetingsModule                       │
│  - CondidatesModule                     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Initialise chaque module importé       │
│  (récursivement)                        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Enregistre les contrôleurs             │
│  de chaque module                       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Crée les instances des services        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Configure l'injection de dépendances   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Application prête                      │
└─────────────────────────────────────────┘
```

### 💡 Concepts Clés

#### Injection de Dépendances
- Les services sont automatiquement injectés dans les contrôleurs
- Pas besoin de créer manuellement les instances
- NestJS gère le cycle de vie des objets

#### Architecture Modulaire
- Chaque fonctionnalité est isolée dans son module
- Les modules peuvent communiquer via les exports/imports
- Facilite la maintenance et les tests

---

## 📄 Fichier : `src/app.controller.ts`

### 🎯 Rôle Principal

**Contrôleur racine de l'application** - Gère les routes HTTP de base de l'application. C'est le point d'entrée pour les requêtes HTTP.

### 📝 Code Complet

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### 🔍 Analyse Ligne par Ligne

#### Ligne 1 : `import { Controller, Get } from '@nestjs/common';`
- **`Controller`** : Décorateur pour marquer une classe comme contrôleur
- **`Get`** : Décorateur pour définir une route GET
- **`@nestjs/common`** : Package contenant les décorateurs de base

#### Ligne 2 : `import { AppService } from './app.service';`
- **Rôle** : Importe le service pour la logique métier
- **Pourquoi** : Les contrôleurs délèguent la logique métier aux services

#### Ligne 4 : `@Controller()`
- **Rôle** : Décorateur qui transforme la classe en contrôleur NestJS
- **Paramètre vide** : Signifie que les routes sont à la racine (`/`)
- **Alternative** : `@Controller('api')` créerait les routes sous `/api`

#### Ligne 5 : `export class AppController`
- **Rôle** : Classe qui contient les méthodes de routage
- **Export** : Permet à NestJS de l'utiliser dans le module

#### Ligne 6 : `constructor(private readonly appService: AppService)`
- **Rôle** : Injection de dépendance du service
- **`private readonly`** :
  - `private` : Accessible uniquement dans cette classe
  - `readonly` : Ne peut pas être réassigné après l'initialisation
- **Injection automatique** : NestJS crée et injecte automatiquement `AppService`

#### Lignes 8-11 : Méthode `getHello()`
- **`@Get()`** : Décorateur qui crée une route GET
- **Paramètre vide** : Route à la racine (`/`)
- **Retour** : Retourne le résultat du service
- **Type de retour** : `string` - TypeScript pour la sécurité de type

### 🌐 Route Créée

Cette méthode crée la route suivante :
- **Méthode HTTP** : `GET`
- **Chemin** : `/`
- **Réponse** : `"Hello World!"`

### 🔄 Flux d'une Requête

```
┌─────────────────────────────────────────┐
│  Client envoie                          │
│  GET http://localhost:3000/             │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  NestJS reçoit la requête HTTP          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Route vers AppController.getHello()    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Appelle appService.getHello()         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Retourne "Hello World!"                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  NestJS envoie la réponse au client    │
└─────────────────────────────────────────┘
```

### 💡 Concepts Clés

#### Décorateurs
- Les décorateurs ajoutent des métadonnées aux classes/méthodes
- NestJS les utilise pour configurer le routage
- Syntaxe `@NomDecorateur()`

#### Injection de Dépendances
- Le service est injecté automatiquement dans le constructeur
- Pas besoin de `new AppService()`
- NestJS gère la création et le partage des instances

---

## 📄 Fichier : `src/app.service.ts`

### 🎯 Rôle Principal

**Service racine de l'application** - Contient la logique métier de base. Les services contiennent la logique métier, séparée de la gestion HTTP.

### 📝 Code Complet

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

### 🔍 Analyse Ligne par Ligne

#### Ligne 1 : `import { Injectable } from '@nestjs/common';`
- **Rôle** : Importe le décorateur `@Injectable`
- **Fonction** : Marque la classe comme un service injectable

#### Ligne 3 : `@Injectable()`
- **Rôle** : Décorateur qui permet l'injection de dépendances
- **Fonction** : Indique à NestJS que cette classe peut être injectée dans d'autres classes
- **Sans ce décorateur** : NestJS ne pourrait pas injecter le service

#### Ligne 4 : `export class AppService`
- **Rôle** : Classe qui contient la logique métier
- **Export** : Permet l'importation dans d'autres fichiers

#### Lignes 5-7 : Méthode `getHello()`
- **Rôle** : Retourne un message de bienvenue
- **Type de retour** : `string`
- **Logique** : Simple pour l'instant, peut être étendue

### 💡 Pourquoi Séparer Service et Contrôleur ?

#### Séparation des Responsabilités

```
┌─────────────────────────────────────────┐
│         CONTROLLER                      │
│  ────────────────────────────────────   │
│  • Gère HTTP                            │
│  • Requêtes, réponses                   │
│  • Validation                           │
└──────────────┬──────────────────────────┘
               │ Appelle
               ▼
┌─────────────────────────────────────────┐
│         SERVICE                         │
│  ────────────────────────────────────   │
│  • Logique métier                       │
│  • Calculs, règles                      │
│  • Accès données                        │
└─────────────────────────────────────────┘
```

#### Avantages
- **Réutilisabilité** : Le service peut être utilisé ailleurs
- **Testabilité** : Plus facile de tester la logique séparément
- **Maintenabilité** : Code organisé et clair

---

## 📁 Dossier : `src/modules/`

### 🎯 Rôle Principal

**Contient tous les modules métier** - Chaque module représente une fonctionnalité complète de l'application.

### 📊 Structure des Modules

Chaque module suit cette structure :

```
modules/[nom]/
├── [nom].module.ts        # Déclaration du module
├── [nom].controller.ts     # Routes HTTP (optionnel)
├── [nom].service.ts        # Logique métier (optionnel)
├── dto/                    # Data Transfer Objects (optionnel)
└── entities/              # Modèles de données (optionnel)
```

### 📋 Modules Disponibles

| Module | État | Description |
|--------|------|-------------|
| `auth/` | ⚠️ Vide | Authentification JWT, login, register |
| `users/` | ⚠️ Vide | Gestion des utilisateurs |
| `documents/` | ⚠️ Vide | Upload, stockage, OCR des documents |
| `meetings/` | ⚠️ Vide | Gestion des réunions/entretiens |
| `condidates/` | ✅ Complet | Gestion des candidats (CRUD) |

---

## 📁 Module : `src/modules/condidates/`

### 🎯 Rôle Principal

**Module de gestion des candidats** - Gère toutes les opérations liées aux candidats (CRUD complet).

### 📊 Structure Complète

```
modules/condidates/
├── condidates.module.ts           # Module principal
├── condidates.controller.ts       # Contrôleur REST
├── condidates.service.ts          # Service métier
├── condidates.controller.spec.ts # Tests du contrôleur
├── condidates.service.spec.ts     # Tests du service
├── dto/                           # DTOs
│   ├── create-condidate.dto.ts
│   └── update-condidate.dto.ts
└── entities/                      # Entités
    └── condidate.entity.ts
```

### 📄 Fichier : `condidates.module.ts`

**Rôle** : Déclare le module candidats, ses contrôleurs et services.

**Code** :
```typescript
import { Module } from '@nestjs/common';
import { CondidatesService } from './condidates.service';
import { CondidatesController } from './condidates.controller';

@Module({
  controllers: [CondidatesController],
  providers: [CondidatesService],
})
export class CondidatesModule {}
```

**Fonctionnalités** :
- Enregistre le contrôleur et le service
- Prêt pour intégration avec base de données

### 📄 Fichier : `condidates.controller.ts`

**Rôle** : Contrôleur REST pour les opérations CRUD sur les candidats.

**Code** :
```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CondidatesService } from './condidates.service';
import { CreateCondidateDto } from './dto/create-condidate.dto';
import { UpdateCondidateDto } from './dto/update-condidate.dto';

@Controller('condidates')
export class CondidatesController {
  constructor(private readonly condidatesService: CondidatesService) {}

  @Post()
  create(@Body() createCondidateDto: CreateCondidateDto) {
    return this.condidatesService.create(createCondidateDto);
  }

  @Get()
  findAll() {
    return this.condidatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.condidatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCondidateDto: UpdateCondidateDto) {
    return this.condidatesService.update(+id, updateCondidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.condidatesService.remove(+id);
  }
}
```

### 🌐 Routes Créées

| Méthode | Route | Description | DTO Utilisé |
|---------|-------|-------------|-------------|
| POST | `/condidates` | Créer un candidat | `CreateCondidateDto` |
| GET | `/condidates` | Lister tous les candidats | - |
| GET | `/condidates/:id` | Récupérer un candidat | - |
| PATCH | `/condidates/:id` | Mettre à jour un candidat | `UpdateCondidateDto` |
| DELETE | `/condidates/:id` | Supprimer un candidat | - |

### 📄 Fichier : `condidates.service.ts`

**Rôle** : Service métier pour la gestion des candidats. Contient la logique métier.

**Code** :
```typescript
import { Injectable } from '@nestjs/common';
import { CreateCondidateDto } from './dto/create-condidate.dto';
import { UpdateCondidateDto } from './dto/update-condidate.dto';

@Injectable()
export class CondidatesService {
  create(createCondidateDto: CreateCondidateDto) {
    return 'This action adds a new condidate';
  }

  findAll() {
    return `This action returns all condidates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} condidate`;
  }

  update(id: number, updateCondidateDto: UpdateCondidateDto) {
    return `This action updates a #${id} condidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} condidate`;
  }
}
```

**État actuel** : Structure de base prête, logique métier à implémenter avec base de données.

### 📄 Fichier : `dto/create-condidate.dto.ts`

**Rôle** : DTO pour valider les données lors de la création d'un candidat.

**Code actuel** :
```typescript
export class CreateCondidateDto {}
```

**À développer** :
```typescript
import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateCondidateDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
```

### 📄 Fichier : `dto/update-condidate.dto.ts`

**Rôle** : DTO pour valider les données lors de la mise à jour d'un candidat.

**Code** :
```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateCondidateDto } from './create-condidate.dto';

export class UpdateCondidateDto extends PartialType(CreateCondidateDto) {}
```

**Fonctionnalités** :
- Hérite de `CreateCondidateDto` avec tous les champs optionnels
- Permet la mise à jour partielle (seulement certains champs)

### 📄 Fichier : `entities/condidate.entity.ts`

**Rôle** : Entité de base de données - Représente la structure d'un candidat en base.

**Code actuel** :
```typescript
export class Condidate {}
```

**À développer (MongoDB avec Mongoose)** :
```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Condidate extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ enum: ['Nouveau', 'Présélectionné', 'Entretien', 'Accepté', 'Refusé'] })
  status: string;
}

export const CondidateSchema = SchemaFactory.createForClass(Condidate);
```

---

## 📁 Modules Vides

### `src/modules/auth/auth.module.ts`

**État** : Module vide

**Rôle futur** : Authentification JWT, login, register

**À créer** :
- `auth.controller.ts` : Endpoints login/register
- `auth.service.ts` : Validation JWT, hash passwords
- `guards/jwt-auth.guard.ts` : Protection des routes
- `strategies/jwt.strategy.ts` : Stratégie Passport

### `src/modules/users/users.module.ts`

**État** : Module vide

**Rôle futur** : Gestion des utilisateurs

**À créer** :
- `users.controller.ts` : CRUD utilisateurs
- `users.service.ts` : Logique métier
- `entities/user.entity.ts` : Modèle utilisateur
- `dto/` : DTOs pour création/mise à jour

### `src/modules/documents/documents.module.ts`

**État** : Module vide

**Rôle futur** : Upload, stockage, OCR des documents

**À créer** :
- `documents.controller.ts` : Upload/téléchargement
- `documents.service.ts` : Gestion MinIO, OCR
- `entities/document.entity.ts` : Métadonnées documents
- Intégration MinIO pour stockage
- Service OCR pour extraction texte

### `src/modules/meetings/meetings.module.ts`

**État** : Module vide

**Rôle futur** : Gestion des réunions/entretiens

**À créer** :
- `meetings.controller.ts` : CRUD réunions
- `meetings.service.ts` : Intégration Google Calendar
- `entities/meeting.entity.ts` : Modèle réunion
- Synchronisation calendrier
- Gestion des invitations

---

## 🏗️ Architecture et Concepts

### Pattern MVC dans NestJS

```
┌─────────────────────────────────────────┐
│           CLIENT                        │
│      (Browser / Postman)                │
└──────────────┬──────────────────────────┘
               │ HTTP Request
               │ (GET, POST, PATCH, DELETE)
               ▼
┌─────────────────────────────────────────┐
│         CONTROLLER                      │
│  ────────────────────────────────────   │
│  • Reçoit la requête HTTP               │
│  • Extrait les paramètres               │
│  • Valide les données (DTO)             │
│  • Appelle le service                   │
└──────────────┬──────────────────────────┘
               │ Appelle méthode
               ▼
┌─────────────────────────────────────────┐
│         SERVICE                         │
│  ────────────────────────────────────   │
│  • Logique métier                       │
│  • Règles de validation                 │
│  • Calculs, transformations             │
│  • Appelle l'entité/repository          │
└──────────────┬──────────────────────────┘
               │ Utilise
               ▼
┌─────────────────────────────────────────┐
│         ENTITY                          │
│  ────────────────────────────────────   │
│  • Modèle de données                    │
│  • Structure en base                    │
│  • Relations                            │
└──────────────┬──────────────────────────┘
               │ Sauvegarde/Charge
               ▼
┌─────────────────────────────────────────┐
│      BASE DE DONNÉES                    │
│      (MongoDB / PostgreSQL)            │
└─────────────────────────────────────────┘
```

### Séparation des Responsabilités

| Composant | Responsabilité | Exemple |
|-----------|----------------|---------|
| **Controller** | HTTP, validation, extraction données | `@Get()`, `@Body()`, `@Param()` |
| **Service** | Logique métier, règles, calculs | Validation, transformations |
| **Entity** | Structure de données, mapping DB | `@Schema()`, `@Prop()` |
| **DTO** | Validation, structure données entrée | `@IsString()`, `@IsEmail()` |

### 🔄 Flux Complet d'une Requête

#### Exemple : Créer un Candidat

```
┌─────────────────────────────────────────┐
│  1. Client envoie                       │
│     POST /condidates                    │
│     {                                   │
│       "firstName": "Jean",              │
│       "lastName": "Dupont",             │
│       "email": "jean@example.com"       │
│     }                                   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  2. NestJS reçoit la requête HTTP       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  3. Route vers                          │
│     CondidatesController.create()       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  4. Validation avec CreateCondidateDto  │
│     • Vérifie les types                 │
│     • Valide les formats                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  5. Appel service                       │
│     condidatesService.create(dto)       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  6. Logique métier                      │
│     • Crée l'entité                     │
│     • Sauvegarde en base                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  7. Retourne le résultat au client      │
└─────────────────────────────────────────┘
```

### 🎓 Concepts Clés à Retenir

#### 1. Modules
- Organisent le code par fonctionnalité
- Permettent l'injection de dépendances
- Facilite la réutilisabilité

#### 2. Controllers
- Gèrent les routes HTTP
- Valident les données d'entrée
- Délèguent la logique aux services

#### 3. Services
- Contiennent la logique métier
- Réutilisables dans plusieurs contrôleurs
- Faciles à tester

#### 4. DTOs
- Valident les données d'entrée
- Assurent la sécurité des types
- Documentent l'API

#### 5. Entities
- Représentent les modèles de données
- Mappent vers la base de données
- Définissent la structure

---

## 📊 Résumé de l'Architecture

### Structure Modulaire

L'application suit une architecture modulaire où chaque fonctionnalité est isolée dans son propre module :

```
┌─────────────────────────────────────────┐
│           AppModule                     │
│  (Module racine)                        │
└──────────────┬──────────────────────────┘
               │ imports
               ├─────────────────┬─────────────────┬─────────────────┬─────────────────┐
               ▼                 ▼                 ▼                 ▼                 ▼
        ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
        │  Auth    │      │  Users   │      │Documents │      │ Meetings │      │Condidates│
        │ Module   │      │ Module   │      │ Module   │      │ Module   │      │ Module   │
        └──────────┘      └──────────┘      └──────────┘      └──────────┘      └──────────┘
```

### État de Développement

| Module | État | Complétude |
|--------|------|------------|
| **Structure de base** | ✅ | 100% |
| **Module condidates** | ✅ | 80% (structure complète, DB à intégrer) |
| **Autres modules** | ⚠️ | 0% (vides, prêts à développer) |
| **Base de données** | ⚠️ | 0% (à configurer) |
| **Authentification** | ⚠️ | 0% (à implémenter) |

---

## 🚀 Prochaines Étapes Recommandées

### Priorité 1 : Base de Données
1. ✅ Installer les dépendances MongoDB/PostgreSQL
2. ✅ Configurer les connexions dans `app.module.ts`
3. ✅ Compléter les entités avec décorateurs Mongoose/TypeORM
4. ✅ Implémenter les services avec accès DB

### Priorité 2 : Module Auth
1. ✅ Créer `auth.controller.ts` et `auth.service.ts`
2. ✅ Implémenter JWT (login, register)
3. ✅ Créer `jwt-auth.guard.ts` pour protéger les routes
4. ✅ Intégrer avec le module Users

### Priorité 3 : Module Users
1. ✅ Créer la structure complète (controller, service, entity, DTOs)
2. ✅ Implémenter CRUD complet
3. ✅ Gestion des rôles et permissions

### Priorité 4 : Module Documents
1. ✅ Configurer MinIO
2. ✅ Créer endpoints upload/téléchargement
3. ✅ Intégrer OCR pour extraction texte
4. ✅ Extraction de compétences

### Priorité 5 : Module Meetings
1. ✅ Créer la structure complète
2. ✅ Intégrer Google Calendar API
3. ✅ Synchronisation automatique
4. ✅ Gestion des invitations

### Priorité 6 : Compléter Condidates
1. ✅ Intégrer base de données
2. ✅ Gestion des états des candidats
3. ✅ Association avec documents
4. ✅ Tests complets

---

## 📚 Ressources Utiles

- [Documentation NestJS](https://docs.nestjs.com/)
- [Architecture NestJS](https://docs.nestjs.com/fundamentals/module-ref)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [TypeORM Documentation](https://typeorm.io/)

---

*Documentation créée le : $(date)*  
*Projet : GEDPro - Plateforme GED RH Intelligente*  
*Version : 1.0.0*

