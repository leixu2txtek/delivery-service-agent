---
name: smart-commit
description: 智能分析代码变更并生成符合 Conventional Commits 规范的提交信息，自动提交到本地仓库。用于手动触发代码提交时使用。
---

# 智能代码提交

自动分析工作目录中的代码变更，生成符合 Conventional Commits 规范的提交信息，并提交到本地 Git 仓库。

## 功能特性

- 自动检查工作目录中的未提交变更（包括已暂存和未暂存的文件）
- 智能分析变更内容，理解变更的性质和目的
- 生成符合 Conventional Commits 规范的提交信息（中文描述）
- 自动添加 Co-Authored-By 标记
- 仅提交到本地仓库，不推送到远程

## 使用方式

在 Claude Code 中直接调用：

```
/smart-commit
```

或者在对话中说：

```
帮我智能提交代码
```

## 提交信息规范

生成的提交信息遵循 Conventional Commits 规范：

```
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

### Type 类型

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构（既不是新功能也不是 bug 修复）
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变更
- `ci`: CI/CD 配置变更

## 执行流程

1. 运行 `git status` 检查未提交的变更
2. 如果没有变更，提示用户并退出
3. 运行 `git diff` 查看变更内容
4. 分析变更内容，确定变更类型和范围
5. 生成符合规范的提交信息
6. 使用 `git add -A` 添加所有变更
7. 使用 `git commit` 创建提交
8. 显示提交结果

## 注意事项

- 此 skill 只提交到本地仓库，不会推送到远程
- 如果需要推送，请手动执行 `git push`
- 提交前会自动添加所有变更文件，请确保不包含敏感信息
- 生成的提交信息可能需要人工审核，建议在重要变更时手动编辑

## 示例

### 示例 1：新功能提交

```
feat(frontend): 添加用户登录页面

- 实现登录表单组件
- 添加表单验证逻辑
- 集成登录 API 接口

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

### 示例 2：Bug 修复

```
fix(backend): 修复用户认证失败的问题

修复 token 验证逻辑中的空指针异常

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

### 示例 3：重构

```
refactor(frontend): 重构路由配置结构

- 将路由配置拆分为多个模块
- 优化路由懒加载逻辑
- 统一路由元信息格式

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

---

## Skill 实现

当用户调用此 skill 时，执行以下步骤：

1. **检查变更**
   ```bash
   git status --porcelain
   ```
   如果输出为空，说明没有变更，提示用户并退出。

2. **查看变更详情**
   ```bash
   git diff HEAD
   ```
   分析所有变更内容（包括已暂存和未暂存的）。

3. **分析变更并生成提交信息**
   - 识别变更的文件和目录
   - 理解变更的目的和影响范围
   - 确定合适的 type 和 scope
   - 生成简洁明确的 subject
   - 如果变更复杂，添加详细的 body 说明

4. **执行提交**
   ```bash
   git add -A
   git commit -m "<生成的提交信息>"
   ```

5. **显示结果**
   显示提交的 hash 和提交信息，确认提交成功。
