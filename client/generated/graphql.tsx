import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type RoomEntity = {
  __typename?: 'RoomEntity';
  id: Scalars['ID'];
  creatorId: Scalars['Float'];
  title: Scalars['String'];
  youtubeLink: Scalars['String'];
  shareLink: Scalars['String'];
  users?: Maybe<Array<User>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  Me?: Maybe<User>;
  FindUsers?: Maybe<Array<User>>;
  FindRoom?: Maybe<RoomEntity>;
};


export type QueryFindRoomArgs = {
  id: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  Register: User;
  Logout: Scalars['Boolean'];
  Login?: Maybe<User>;
  deleteAllUsers: Scalars['Boolean'];
  CreateRoom: RoomEntity;
  AddUser: Scalars['Boolean'];
  removeUser: Scalars['Boolean'];
  deleteRooms: Scalars['Boolean'];
  DeleteRoom: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateRoomArgs = {
  shareLink?: Maybe<Scalars['String']>;
  youtubeLink: Scalars['String'];
  title: Scalars['String'];
  user: UserInput;
};


export type MutationAddUserArgs = {
  id: Scalars['Float'];
  user: UserInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['Float'];
  user: UserInput;
};


export type MutationDeleteRoomArgs = {
  id: Scalars['Float'];
};

export type UserInput = {
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type AddUserMutationVariables = Exact<{
  user: UserInput;
  id: Scalars['Float'];
}>;


export type AddUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'AddUser'>
);

export type CreateRoomMutationVariables = Exact<{
  user: UserInput;
  title: Scalars['String'];
  youtubeLink: Scalars['String'];
  shareLink?: Maybe<Scalars['String']>;
}>;


export type CreateRoomMutation = (
  { __typename?: 'Mutation' }
  & { CreateRoom: (
    { __typename?: 'RoomEntity' }
    & Pick<RoomEntity, 'id'>
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { Login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'Logout'>
);

export type RemoveUserMutationVariables = Exact<{
  user: UserInput;
  id: Scalars['Float'];
}>;


export type RemoveUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeUser'>
);

export type FindRoomQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type FindRoomQuery = (
  { __typename?: 'Query' }
  & { FindRoom?: Maybe<(
    { __typename?: 'RoomEntity' }
    & Pick<RoomEntity, 'id' | 'title' | 'youtubeLink'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { Me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);


export const AddUserDocument = gql`
    mutation addUser($user: UserInput!, $id: Float!) {
  AddUser(user: $user, id: $id)
}
    `;

export function useAddUserMutation() {
  return Urql.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument);
};
export const CreateRoomDocument = gql`
    mutation createRoom($user: UserInput!, $title: String!, $youtubeLink: String!, $shareLink: String) {
  CreateRoom(
    user: $user
    title: $title
    youtubeLink: $youtubeLink
    shareLink: $shareLink
  ) {
    id
  }
}
    `;

export function useCreateRoomMutation() {
  return Urql.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument);
};
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  Login(username: $username, password: $password) {
    id
    username
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  Logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RemoveUserDocument = gql`
    mutation removeUser($user: UserInput!, $id: Float!) {
  removeUser(user: $user, id: $id)
}
    `;

export function useRemoveUserMutation() {
  return Urql.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument);
};
export const FindRoomDocument = gql`
    query findRoom($id: Float!) {
  FindRoom(id: $id) {
    id
    title
    youtubeLink
  }
}
    `;

export function useFindRoomQuery(options: Omit<Urql.UseQueryArgs<FindRoomQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindRoomQuery>({ query: FindRoomDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  Me {
    id
    username
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};