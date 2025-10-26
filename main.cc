#include "main.h"

using namespace Napi;

namespace nodejs_raw_unix_pipe {
void compile(const CallbackInfo &info) {}

void validate(const CallbackInfo &info) {}

} // namespace nodejs_raw_unix_pipe

Napi::Object Init(Napi::Env env, Napi::Object exports) { return exports; }

NODE_API_MODULE(addon, Init)