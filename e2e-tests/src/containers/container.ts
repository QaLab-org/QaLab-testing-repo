export const ContainerKeys = {
    browser: 'browser',
    context: 'context',
    page: 'page',
    logger: 'logger',
} as const;

export class Container {
    public static dependencies: { [key: string]: any } = {};

    static register(name: string, dependency: any): void {
        Container.dependencies[name] = dependency;
    }

    static resolve<T>(name: string): T {
        if (!(name in Container.dependencies)) {
            throw new Error(`Dependency not found: ${name}`);
        }

        return Container.dependencies[name];
    }

    static remove(name: string): void {
        if (!(name in Container.dependencies)) {
            throw new Error(`Dependency not found: ${name}`);
        }

        delete Container.dependencies[name];
    }

    // New methods for arrays of sequences
    static registerSequenceArray(name: string, sequences: string[]): void {
        Container.dependencies[name] = sequences;
    }

    static resolveSequenceArray(name: string): string[] {
        if (!(name in Container.dependencies)) {
            throw new Error(`Dependency not found: ${name}`);
        }

        return Container.dependencies[name];
    }

    static isRegistered(name: string): boolean {
        return name in Container.dependencies;
    }
}
