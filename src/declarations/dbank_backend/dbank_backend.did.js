export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'balance' : IDL.Func([], [IDL.Float64], ['query']),
    'compound' : IDL.Func([], [], ['oneway']),
    'topDown' : IDL.Func([IDL.Float64], [], ['oneway']),
    'topUp' : IDL.Func([IDL.Float64], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };
