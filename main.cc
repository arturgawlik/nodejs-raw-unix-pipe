#include "main.h"

using namespace Napi;

namespace nodejs_raw_unix_pipe {
Napi::Value pipe_create(const CallbackInfo &info) {
  const auto env = info.Env();
  int p[2];
  if (pipe(p) < 0) {
    // TODO: throw JS error instead
    exit(1);
  }
  const auto res = Array::New(env, 2);
  res.Set((uint32_t)0, Number::New(env, p[0]));
  res.Set(1, Number::New(env, p[1]));

  return res;
}

} // namespace nodejs_raw_unix_pipe

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("pipe_create",
              Napi::Function::New(env, nodejs_raw_unix_pipe::pipe_create));
  return exports;
}

NODE_API_MODULE(addon, Init)