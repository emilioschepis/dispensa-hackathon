import { authExchange as _authExchange } from "@urql/exchange-auth";
import { makeOperation, Operation } from "urql";

import { getAccessToken, refreshAccessToken, verifyAccessToken } from "../../utils/authUtils";

type AuthState = { token: string };

async function getAuth({ authState }: { authState: AuthState | null }): Promise<AuthState | null> {
  if (!authState) {
    const token = await getAccessToken();
    if (token) {
      return { token };
    }

    return null;
  }

  const token = await refreshAccessToken();
  if (token) {
    return { token };
  }

  return null;
}

function addAuthToOperation({
  authState,
  operation,
}: {
  authState: AuthState | null;
  operation: Operation;
}): Operation {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === "function"
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions ?? {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authState.token}`,
      },
    },
  });
}

function willAuthError({ authState }: { authState: AuthState | null }): boolean {
  return !authState || !verifyAccessToken(authState.token);
}

const authExchange = _authExchange<AuthState>({
  getAuth,
  addAuthToOperation,
  willAuthError,
});

export default authExchange;
