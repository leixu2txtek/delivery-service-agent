## ADDED Requirements

### Requirement: 用户可以通过手机号和密码登录
系统 SHALL 允许用户使用已注册的手机号和密码进行身份验证，成功后返回 JWT Token。

#### Scenario: 登录成功
- **WHEN** 用户提交有效的手机号和密码
- **THEN** 系统验证凭据正确
- **AND** 返回 JWT Token 和用户信息
- **AND** Token 有效期为 7 天

#### Scenario: 登录失败-手机号不存在
- **WHEN** 用户提交未注册的手机号
- **THEN** 系统返回错误信息"手机号或密码错误"
- **AND** 不返回 Token

#### Scenario: 登录失败-密码错误
- **WHEN** 用户提交错误的密码
- **THEN** 系统返回错误信息"手机号或密码错误"
- **AND** 记录登录失败次数，5 次失败后锁定账号 30 分钟

### Requirement: 系统 SHALL 验证用户身份后才能访问对话功能
所有对话相关的 API SHALL 在请求头中携带有效的 JWT Token，否则返回 401 错误。

#### Scenario: 未登录访问对话
- **WHEN** 用户未携带 Token 访问对话接口
- **THEN** 系统返回 401 Unauthorized
- **AND** 返回错误信息"请先登录"

#### Scenario: Token 过期
- **WHEN** 用户携带已过期的 Token 访问接口
- **THEN** 系统返回 401 Unauthorized
- **AND** 返回错误信息"登录已过期，请重新登录"

### Requirement: 用户可以修改密码
已登录用户 SHALL 可以通过旧密码验证后设置新密码。

#### Scenario: 修改密码成功
- **WHEN** 用户提交正确的旧密码和新密码
- **THEN** 系统验证旧密码正确
- **AND** 更新密码（加密存储）
- **AND** 使所有现有 Token 失效
- **AND** 返回成功信息

#### Scenario: 修改密码失败-旧密码错误
- **WHEN** 用户提交错误的旧密码
- **THEN** 系统返回错误信息"旧密码错误"
- **AND** 密码保持不变

#### Scenario: 新密码不符合规则
- **WHEN** 用户提交的新密码少于 6 位
- **THEN** 系统返回错误信息"密码长度不能少于 6 位"
- **AND** 密码保持不变
