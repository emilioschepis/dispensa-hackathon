import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: string;
  uuid: string;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/**
 * Inventories keep track of the availability of products for an user.
 *
 *
 * columns and relationships of "inventories"
 *
 */
export type Inventories = {
  __typename?: 'inventories';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  user_id: Scalars['String'];
};

/** Boolean expression to filter rows from the table "inventories". All fields are combined with a logical 'AND'. */
export type Inventories_Bool_Exp = {
  _and?: InputMaybe<Array<Inventories_Bool_Exp>>;
  _not?: InputMaybe<Inventories_Bool_Exp>;
  _or?: InputMaybe<Array<Inventories_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** input type for inserting data into table "inventories" */
export type Inventories_Insert_Input = {
  name?: InputMaybe<Scalars['String']>;
};

/** response of any mutation on the table "inventories" */
export type Inventories_Mutation_Response = {
  __typename?: 'inventories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Inventories>;
};

/** input type for inserting object relation for remote table "inventories" */
export type Inventories_Obj_Rel_Insert_Input = {
  data: Inventories_Insert_Input;
};

/** Ordering options when selecting data from "inventories". */
export type Inventories_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "inventories" */
export enum Inventories_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'user_id'
}

/**
 * This table tracks the availability of products in an inventory.
 *
 *
 * columns and relationships of "inventory_items"
 *
 */
export type Inventory_Items = {
  __typename?: 'inventory_items';
  /** An object relationship */
  inventory: Inventories;
  inventory_id: Scalars['uuid'];
  /** An object relationship */
  product: Products;
  product_id: Scalars['uuid'];
  quantity: Scalars['Int'];
};

/** Boolean expression to filter rows from the table "inventory_items". All fields are combined with a logical 'AND'. */
export type Inventory_Items_Bool_Exp = {
  _and?: InputMaybe<Array<Inventory_Items_Bool_Exp>>;
  _not?: InputMaybe<Inventory_Items_Bool_Exp>;
  _or?: InputMaybe<Array<Inventory_Items_Bool_Exp>>;
  inventory?: InputMaybe<Inventories_Bool_Exp>;
  inventory_id?: InputMaybe<Uuid_Comparison_Exp>;
  product?: InputMaybe<Products_Bool_Exp>;
  product_id?: InputMaybe<Uuid_Comparison_Exp>;
  quantity?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "inventory_items" */
export enum Inventory_Items_Constraint {
  /** unique or primary key constraint */
  InventoryProductsPkey = 'inventory_products_pkey'
}

/** input type for incrementing numeric columns in table "inventory_items" */
export type Inventory_Items_Inc_Input = {
  quantity?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "inventory_items" */
export type Inventory_Items_Insert_Input = {
  inventory?: InputMaybe<Inventories_Obj_Rel_Insert_Input>;
  inventory_id?: InputMaybe<Scalars['uuid']>;
  product?: InputMaybe<Products_Obj_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['uuid']>;
  quantity?: InputMaybe<Scalars['Int']>;
};

/** response of any mutation on the table "inventory_items" */
export type Inventory_Items_Mutation_Response = {
  __typename?: 'inventory_items_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Inventory_Items>;
};

/** on_conflict condition type for table "inventory_items" */
export type Inventory_Items_On_Conflict = {
  constraint: Inventory_Items_Constraint;
  update_columns?: Array<Inventory_Items_Update_Column>;
  where?: InputMaybe<Inventory_Items_Bool_Exp>;
};

/** Ordering options when selecting data from "inventory_items". */
export type Inventory_Items_Order_By = {
  inventory?: InputMaybe<Inventories_Order_By>;
  inventory_id?: InputMaybe<Order_By>;
  product?: InputMaybe<Products_Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** primary key columns input for table: inventory_items */
export type Inventory_Items_Pk_Columns_Input = {
  inventory_id: Scalars['uuid'];
  product_id: Scalars['uuid'];
};

/** select columns of table "inventory_items" */
export enum Inventory_Items_Select_Column {
  /** column name */
  InventoryId = 'inventory_id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  Quantity = 'quantity'
}

/** input type for updating data in table "inventory_items" */
export type Inventory_Items_Set_Input = {
  quantity?: InputMaybe<Scalars['Int']>;
};

/** update columns of table "inventory_items" */
export enum Inventory_Items_Update_Column {
  /** column name */
  Quantity = 'quantity'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "inventory_items" */
  delete_inventory_items?: Maybe<Inventory_Items_Mutation_Response>;
  /** delete single row from the table: "inventory_items" */
  delete_inventory_items_by_pk?: Maybe<Inventory_Items>;
  /** delete data from the table: "products" */
  delete_products?: Maybe<Products_Mutation_Response>;
  /** delete single row from the table: "products" */
  delete_products_by_pk?: Maybe<Products>;
  /** insert data into the table: "inventories" */
  insert_inventories?: Maybe<Inventories_Mutation_Response>;
  /** insert a single row into the table: "inventories" */
  insert_inventories_one?: Maybe<Inventories>;
  /** insert data into the table: "inventory_items" */
  insert_inventory_items?: Maybe<Inventory_Items_Mutation_Response>;
  /** insert a single row into the table: "inventory_items" */
  insert_inventory_items_one?: Maybe<Inventory_Items>;
  /** insert data into the table: "products" */
  insert_products?: Maybe<Products_Mutation_Response>;
  /** insert a single row into the table: "products" */
  insert_products_one?: Maybe<Products>;
  /** update data of the table: "inventory_items" */
  update_inventory_items?: Maybe<Inventory_Items_Mutation_Response>;
  /** update single row of the table: "inventory_items" */
  update_inventory_items_by_pk?: Maybe<Inventory_Items>;
  /** update data of the table: "products" */
  update_products?: Maybe<Products_Mutation_Response>;
  /** update single row of the table: "products" */
  update_products_by_pk?: Maybe<Products>;
};


/** mutation root */
export type Mutation_RootDelete_Inventory_ItemsArgs = {
  where: Inventory_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Inventory_Items_By_PkArgs = {
  inventory_id: Scalars['uuid'];
  product_id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProductsArgs = {
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Products_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_InventoriesArgs = {
  objects: Array<Inventories_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Inventories_OneArgs = {
  object: Inventories_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Inventory_ItemsArgs = {
  objects: Array<Inventory_Items_Insert_Input>;
  on_conflict?: InputMaybe<Inventory_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Inventory_Items_OneArgs = {
  object: Inventory_Items_Insert_Input;
  on_conflict?: InputMaybe<Inventory_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProductsArgs = {
  objects: Array<Products_Insert_Input>;
  on_conflict?: InputMaybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Products_OneArgs = {
  object: Products_Insert_Input;
  on_conflict?: InputMaybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Inventory_ItemsArgs = {
  _inc?: InputMaybe<Inventory_Items_Inc_Input>;
  _set?: InputMaybe<Inventory_Items_Set_Input>;
  where: Inventory_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Inventory_Items_By_PkArgs = {
  _inc?: InputMaybe<Inventory_Items_Inc_Input>;
  _set?: InputMaybe<Inventory_Items_Set_Input>;
  pk_columns: Inventory_Items_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProductsArgs = {
  _set?: InputMaybe<Products_Set_Input>;
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Products_By_PkArgs = {
  _set?: InputMaybe<Products_Set_Input>;
  pk_columns: Products_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/**
 * A product is an object that can be put in the inventory.
 *
 *
 * columns and relationships of "products"
 *
 */
export type Products = {
  __typename?: 'products';
  /** This field represents the barcode of the product, if available. */
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  user_id: Scalars['String'];
};

/** Boolean expression to filter rows from the table "products". All fields are combined with a logical 'AND'. */
export type Products_Bool_Exp = {
  _and?: InputMaybe<Array<Products_Bool_Exp>>;
  _not?: InputMaybe<Products_Bool_Exp>;
  _or?: InputMaybe<Array<Products_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "products" */
export enum Products_Constraint {
  /** unique or primary key constraint */
  ProductsPkey = 'products_pkey',
  /** unique or primary key constraint */
  ProductsUserIdCodeKey = 'products_user_id_code_key'
}

/** input type for inserting data into table "products" */
export type Products_Insert_Input = {
  /** This field represents the barcode of the product, if available. */
  code?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** response of any mutation on the table "products" */
export type Products_Mutation_Response = {
  __typename?: 'products_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Products>;
};

/** input type for inserting object relation for remote table "products" */
export type Products_Obj_Rel_Insert_Input = {
  data: Products_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Products_On_Conflict>;
};

/** on_conflict condition type for table "products" */
export type Products_On_Conflict = {
  constraint: Products_Constraint;
  update_columns?: Array<Products_Update_Column>;
  where?: InputMaybe<Products_Bool_Exp>;
};

/** Ordering options when selecting data from "products". */
export type Products_Order_By = {
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: products */
export type Products_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "products" */
export enum Products_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "products" */
export type Products_Set_Input = {
  /** This field represents the barcode of the product, if available. */
  code?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "products" */
export enum Products_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  Name = 'name'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "inventories" */
  inventories: Array<Inventories>;
  /** fetch data from the table: "inventories" using primary key columns */
  inventories_by_pk?: Maybe<Inventories>;
  /** fetch data from the table: "inventory_items" */
  inventory_items: Array<Inventory_Items>;
  /** fetch data from the table: "inventory_items" using primary key columns */
  inventory_items_by_pk?: Maybe<Inventory_Items>;
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootInventoriesArgs = {
  distinct_on?: InputMaybe<Array<Inventories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Inventories_Order_By>>;
  where?: InputMaybe<Inventories_Bool_Exp>;
};


export type Query_RootInventories_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootInventory_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Inventory_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Inventory_Items_Order_By>>;
  where?: InputMaybe<Inventory_Items_Bool_Exp>;
};


export type Query_RootInventory_Items_By_PkArgs = {
  inventory_id: Scalars['uuid'];
  product_id: Scalars['uuid'];
};


export type Query_RootProductsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Query_RootProducts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "inventories" */
  inventories: Array<Inventories>;
  /** fetch data from the table: "inventories" using primary key columns */
  inventories_by_pk?: Maybe<Inventories>;
  /** fetch data from the table: "inventory_items" */
  inventory_items: Array<Inventory_Items>;
  /** fetch data from the table: "inventory_items" using primary key columns */
  inventory_items_by_pk?: Maybe<Inventory_Items>;
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Subscription_RootInventoriesArgs = {
  distinct_on?: InputMaybe<Array<Inventories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Inventories_Order_By>>;
  where?: InputMaybe<Inventories_Bool_Exp>;
};


export type Subscription_RootInventories_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootInventory_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Inventory_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Inventory_Items_Order_By>>;
  where?: InputMaybe<Inventory_Items_Bool_Exp>;
};


export type Subscription_RootInventory_Items_By_PkArgs = {
  inventory_id: Scalars['uuid'];
  product_id: Scalars['uuid'];
};


export type Subscription_RootProductsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  email: Scalars['String'];
  id: Scalars['String'];
  username: Scalars['String'];
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Username = 'username'
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type CreateInventoryMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateInventoryMutation = { __typename?: 'mutation_root', insert_inventories_one?: { __typename?: 'inventories', id: string, name: string } | null };

export type InventoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type InventoriesQuery = { __typename?: 'query_root', inventories: Array<{ __typename?: 'inventories', id: string, name: string }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id: string, username: string, email: string }> };


export const CreateInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateInventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_inventories_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"default","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateInventoryMutation, CreateInventoryMutationVariables>;
export const InventoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Inventories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<InventoriesQuery, InventoriesQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;